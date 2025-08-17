class Blob {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 40; // 半径
		this.segments = 100;
	}

	/**
	 * 泡のパスを生成する
	 * @param {Ball[]} balls - ボールの配列
	 * @returns {string} SVGパスデータ
	 */
	rubberPath(balls) {
		let d = "";

		for (let i = 0; i <= this.segments; i++) {
			const theta = (2 * Math.PI * i) / this.segments;

			// 基本の円
			let R = this.r;
			const x0 = this.x + this.r * Math.cos(theta);
			const y0 = this.y + this.r * Math.sin(theta);

			// 各ボールの影響を加算
			balls.forEach(({ x: bx, y: by }) => {
				const dx = bx - x0;
				const dy = by - y0;
				const dist2 = dx * dx + dy * dy;
				R += 20 * Math.exp(-dist2 / 2000); // ガウス関数
			});


			// 最終座標
			const x = ~~((this.x + R * Math.cos(theta)) * 100) / 100;
			const y = ~~((this.y + R * Math.sin(theta)) * 100) / 100;

			d += (i === 0 ? `M ${x},${y} ` : `L ${x},${y} `);
		}
		d += "Z";
		return d;
	}
}

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vx = (Math.random() - 0.5) * 1; // -2〜+2 のxのランダム速度
		this.vy = (Math.random() - 0.5) * 1; // -2〜+2 のyのランダム速度
		this.r = 10
	}

	/** * ボールの位置を更新する
	 * @param {number} dx - x方向の変位
	 * @param {number} dy - y方向の変位
	 * */
	update(cx, cy, r) {
		// ボールの位置を更新
		this.x += this.vx;
		this.y += this.vy;

		// 内壁との衝突判定（中心からの距離）
		const dx = this.x - cx;
		const dy = this.y - cy;
		
		// 距離の計算
		let dist = Math.hypot(dx, dy);

		// 法線（中心→ボール方向）
		const nx = dx / dist;
		const ny = dy / dist;

		// ボールの速度ベクトルと法線の内積
		const dot = this.vx * nx + this.vy * ny;

		// 内壁の有効半径
		const limit = r - this.r;

		// 衝突判定
		if (dist > limit) {
			
			// 壁の内側に位置を戻す（めり込み解消）
			this.x = cx + nx * (limit - 0.5);
			this.y = cy + ny * (limit - 0.5);

			// 法線が外側を向いていた場合うまく反射させる
			if (dot > 0) {
				// ランダムな角度と反転
				const randomAngle = (Math.random() - 0.5) *(Math.PI / 6) + Math.PI; 

				// 反射ベクトルの計算
				const cos = Math.cos(randomAngle);
				const sin = Math.sin(randomAngle);
				const rx = nx * cos - ny * sin;
				const ry = nx * sin + ny * cos;

				// 速度の大きさを維持
				const speed = Math.hypot(this.vx, this.vy)
				this.vx = rx * speed;
				this.vy = ry * speed;4
			}
		}
	}
}

a = 0
c = 0
function animate() {
	const blob = new Blob(125, 125);
	const balls = Array.from({ length:6 }, () => new Ball(125, 125));

	function frame() {
		//ボールを動かす
		balls.forEach((b, i) => {
			b.update(blob.x, blob.y, blob.r);
		});

		const pathData = blob.rubberPath(balls);
		document.querySelector(".circle").style.clipPath = `path('${pathData}')`;

		// 次のフレームをリクエスト
		requestAnimationFrame(frame);
	}

	frame();
}
animate();