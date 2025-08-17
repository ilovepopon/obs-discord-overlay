class Balloon {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 80; // 半径
		this.segments = 100;
	}

	/**
	 * ゴム風船のパスを生成する
	 * @param {Ball[]} balls - ボールの配列
	 * @returns {string} SVGパスデータ
	 */
	rubberPath(balls) {
		let d = "";

		// 追加: R の物理上限（この値を超えないようにする）
		const box = 240;
		const Rmax = Math.min(this.x, this.y, box - this.x, box - this.y) - 0.5;

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

			// 追加: 上限でクリップ（これで絶対にはみ出さない）
			if (R > Rmax) R = Rmax;

			// 最終座標
			const x = this.x + R * Math.cos(theta);
			const y = this.y + R * Math.sin(theta);

			d += (i === 0 ? `M ${~~(x*100) / 100},${~~(y*100) / 100} ` : `L ${~~(x*100) / 100},${~~(y*100) / 100} `);
		}
		d += "Z";
		return d;
	}
}

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vx = (Math.random() - 0.5) * 2; // -2〜+2 のxのランダム速度
		this.vy = (Math.random() - 0.5) * 2; // -2〜+2 のyのランダム速度
		this.r = 18
	}

	/** * ボールの位置を更新する
	 * @param {number} dx - x方向の変位
	 * @param {number} dy - y方向の変位
	 * */
	update(cx, cy, r) {
		
		this.x += this.vx;
		this.y += this.vy;
		// 内壁との衝突判定（中心からの距離）
		const dx = this.x - cx;
		const dy = this.y - cy;
		let dist = Math.hypot(dx, dy);
		console.log(dist)
		// 法線（中心→ボール方向）
		const nx = dx / dist;
		const ny = dy / dist;

		// 速度を法線で反射（v' = v - 2(v·n)n）
		const dot = this.vx * nx + this.vy * ny;
		const limit = r - this.r; // 内壁の有効半径

		if (dist > limit) {
			
			// 壁の内側に位置を戻す（めり込み解消）
			this.x = cx + nx * (limit - 0.5);
			this.y = cy + ny * (limit - 0.5);

			if (dot > 0) {
				const randomAngle = (Math.random() - 0.5) *(Math.PI / 6) + Math.PI; // ランダムな角度
				const cos = Math.cos(randomAngle);
				const sin = Math.sin(randomAngle);
				const rx = nx * cos - ny * sin;
				const ry = nx * sin + ny * cos;

				const speed = Math.hypot(this.vx, this.vy) || 2; // ゼロ割回避で最低速2
				this.vx = rx * speed;
				this.vy = ry * speed;4
				console.log(speed)
			}
		}
	}
}

a = 0
c = 0
function animate() {
	const balloon = new Balloon(120, 120);
	const balls = Array.from({ length:6 }, () => new Ball(240 / 2, 240 / 2));

	function frame() {
		//ボールを動かす
		balls.forEach((b, i) => {
			b.update(balloon.x, balloon.y, balloon.r);
		});

		const pathData = balloon.rubberPath(balls);
		document.querySelector(".circle").style.clipPath = `path('${pathData}')`;

		if (a % 10 === 0 && c < 100) {
			document.querySelector(".debug").textContent += `${c}%{clip-path: path("${pathData}");}\n`;
			c++;
		}
		a++;
		requestAnimationFrame(frame);
	}

	frame();
}
animate();
