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
	   --color-before: radial-gradient(circle at 35% 30%, #3ba53b, #a3e635 60%, #bef264);
	   --color-after: radial-gradient(circle at 35% 30%, #3ba53b, #4fd64f 60%, #2a7a2a);
	   --color-owner-before: radial-gradient(circle at 35% 30%, #a78bfa, #60a5fa 60%, #22d3ee);
	   --color-owner-after: radial-gradient(circle at 35% 30%, #f97316, #f59e0b 60%, #ef4444);
   }
   ```

   > [!TIP]
   > 各ユーザごとに色を変えることも可能です。
   > 
   > `/* ----- 個別設定 ここから ----- */`から`/* ----- 個別設定 ここまで ----- */`と書かれてるところに以下のコードをユーザーごとに書いてください。
   >
   > `"USER_ID_HERE"`のところにはDiscordのユーザーIDが入ります。
   > 
   > ```css
   > .voice_state[data-userid="USER_ID_HERE"]::before{
   >     background: radial-gradient(circle at 35% 30%, #60a5fa, #22d3ee 60%, #a78bfa);
   > }
   >
   > .voice_state[data-userid="USER_ID_HERE"]::after {
   >     background: radial-gradient(circle at 35% 30%, #f97316, #f59e0b 60%, #ef4444);
   > }
   > ```

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
   :root{
	   --color-before: radial-gradient(circle at 35% 30%, #3ba53b, #a3e635 60%, #bef264);
	   --color-after: radial-gradient(circle at 35% 30%, #3ba53b, #4fd64f 60%, #2a7a2a);
	   --color-owner-before: radial-gradient(circle at 35% 30%, #a78bfa, #60a5fa 60%, #22d3ee);
	   --color-owner-after: radial-gradient(circle at 35% 30%, #f97316, #f59e0b 60%, #ef4444);
   }
   ```

   > [!TIP]
   > You can also assign different colors to each user.
   > 
   > `/* ----- Individual Settings Start ----- */` to `/* ----- Individual Settings End ----- */`. Replace "USER_ID_HERE" with the user’s Discord ID.
   >
   > Replace `"USER_ID_HERE"` with the user’s Discord ID.
   > 
   > ```css
   > .voice_state[data-userid="USER_ID_HERE"]::before{
   >     background: radial-gradient(circle at 35% 30%, #60a5fa, #22d3ee 60%, #a78bfa);
   > }
   >
   > .voice_state[data-userid="USER_ID_HERE"]::after {
   >     background: radial-gradient(circle at 35% 30%, #f97316, #f59e0b 60%, #ef4444);
   > }
   > ```

## For developers

このアニメーションを作成するにあたって`keyframes`を自分で作成することが可能です。

また、DiscordのOverlayでは難しいですが後ろの泡を`requestAnimationFrame()`で作成することも可能です。

コードは[testディレクトリ](./test)にあります。

---

You can create your own `keyframes` to build this animation.  

While it is more challenging within Discord’s overlay, it is also possible to generate the background bubbles using `requestAnimationFrame()`.  

The code can be found in the [test directory](./test).  

## Credit

もしこのカスタムCSSを配信等で使用する場合は、クレジット表記をしていただけたらうれしいです。

形式は自由です。  

Discord Voice Chat Overlay CSS by [@ilovepopon](https://x.com/ilovepopon)

---

If you use this custom CSS in your stream or video, I would appreciate it if you could include a credit. 

The format is flexible.  

Discord Voice Chat Overlay CSS by [@ilovepopon](https://x.com/ilovepopon)


## Disclaimer 

This project is not affiliated with or endorsed by Discord Inc. 

Discord and its logo/brand colors are trademarks of Discord Inc.
