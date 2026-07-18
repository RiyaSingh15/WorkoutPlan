# Lift With Intent — Training Log

A single-page, static training log (Push / Pull / Legs ×2, 4-week block). No backend, no build step, no external dependencies — everything needed is in this folder.

## Project structure

```
├── index.html              Page markup
├── css/
│   └── style.css           All styles
├── js/
│   ├── data.js             Workout data — edit this to change sets, reps, or exercises
│   └── app.js               Renders the page from data.js and wires up interactions
├── assets/
│   ├── favicon.svg          Favicon (modern browsers)
│   ├── favicon-32.png       Favicon fallback (older browsers)
│   ├── apple-touch-icon.png Home-screen icon (iOS)
│   ├── icon-192.png         Home-screen icon (Android/PWA)
│   └── icon-512.png         Home-screen icon (Android/PWA)
├── manifest.webmanifest     Lets phones "Add to Home Screen" with a proper icon/name
└── .nojekyll                Tells GitHub Pages to serve files as-is, skipping Jekyll
```

Everything is plain HTML/CSS/JS — no npm, no build tools, no frameworks. Open `index.html` directly in a browser and it works exactly as it will once deployed.

## Deploy to GitHub Pages

1. Create a new GitHub repository (public, or private on a paid plan) and push everything in this folder to it, e.g.:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Select branch **main**, folder **/ (root)**, then **Save**.
5. Wait ~1 minute. Your page will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

No further configuration is needed — there's no build step, and every asset is referenced with a relative path (`css/style.css`, `js/app.js`, `assets/...`), so the site works correctly whether it's hosted at the root of a domain or in a subpath like `/repo-name/`.

## Editing your plan

Open `js/data.js`. Each day is an object in the `days` array; each exercise is an object in that day's `ex` array. Change a `s:"3 × 10–12"` value to adjust sets/reps, edit `steps`/`cue` text, or add/remove exercise objects entirely — `index.html` and `app.js` don't need to change. Refresh the page (or push to GitHub) to see the update.

## Browser support

Built on standard, broadly-supported web platform features (CSS custom properties, `<details>/<summary>`, `clamp()`) with no external requests — it works offline once loaded and loads fast even on a poor gym wifi connection. Tested patterns work across current Chrome, Safari, Firefox, and Edge on both desktop and mobile.
