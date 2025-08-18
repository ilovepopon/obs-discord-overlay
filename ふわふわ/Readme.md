# Custom CSS for Discord Voice Chat Overlay in OBS

あわあわ風のアニメーション背景がついた、OBS向けDiscordボイスチャットオーバーレイ用のCSSです。

CSS overlay with bubbly animation background for Discord voice chat in OBS.

## Features

- ほかの配信者と差別化ができます。
- 自分好みに話してるときの背景を設定できます。
- だれがしゃべってるか視覚的にすぐにわかります。
- JSを使用せずCSSだけで実現が可能です。

---

- Stand out from other streamers.  
- Customize the background animation when speaking to your own preference.  
- Instantly see who is currently talking with a clear visual indicator.  
- Achieved entirely with CSS, no JavaScript required.  


## Usage

1. OBSにブラウザソースを追加。
2. そのブラウザソースのURLをDiscordのオーバーレイページに設定。
3. カスタムCSSを設定します。
   以下二つのCSSファイルの中身をコピーして「カスタムCSS」の方にコピーアンドペーストをしてください。
   - [Discord.css](./discord.css)
   - [Keyframes.css](./keyframes.css)（軽量版：[Keyframes-lite.css](./keyframes-lite.css)）
4. 自分好みの色にカスタマイズしたい場合は以下を変更してください。
   ~~（ChatGPT先生に投げればやってくれるよ）~~
   ```css
   :root{
	--color1:radial-gradient(circle at 35% 30%, #60a5fa, #22d3ee 60%, #a78bfa);
	--color2:radial-gradient(circle at 35% 30%, #ef4444, #f97316 60%, #f59e0b);
   }
   ```

--- 

1. Add a **Browser Source** in OBS.  
2. Set the Browser Source URL to your Discord overlay page.  
3. Apply custom CSS.  
   Copy the contents of the following two CSS files and paste them into the **Custom CSS** field:  
   - [Discord.css](./discord.css)  
   - [Keyframes.css](./keyframes.css) (lightweight version: [Keyframes-lite.css](./keyframes-lite.css))  
4. If you want to customize the colors to your liking, modify the following section:  
   ~~(Or just ask ChatGPT to do it for you)~~  
   ```css
   :root {
     --color1: radial-gradient(circle at 35% 30%, #60a5fa, #22d3ee 60%, #a78bfa);
     --color2: radial-gradient(circle at 35% 30%, #ef4444, #f97316 60%, #f59e0b);
   }
   ```

## For developers

このアニメーションを作成するにあたって`keyframes`を自分で作成することが可能です。

また、DiscordのOverlayでは難しいですが後ろの泡を`requestAnimationFrame()`で作成することも可能です。

コードは[testディレクトリ](./test)にあります。

---

You can create your own `keyframes` to build this animation.  

While it is more challenging within Discord’s overlay, it is also possible to generate the background bubbles using `requestAnimationFrame()`.  

The code can be found in the [test directory](./test).  


## Disclaimer 

This project is not affiliated with or endorsed by Discord Inc. 

Discord and its logo/brand colors are trademarks of Discord Inc.
