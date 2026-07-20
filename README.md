# Workout Plan

A single-page, static workout plan (Push / Pull / Legs ×2, 4-week block). No backend, no build step, no external dependencies — everything needed is in this folder.

**Live site:** [workout-plan-five-silk.vercel.app](https://workout-plan-five-silk.vercel.app)

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
└── manifest.webmanifest     Lets phones "Add to Home Screen" with a proper icon/name
```

Everything is plain HTML/CSS/JS — no npm, no build tools, no frameworks. Open `index.html` directly in a browser and it works exactly as it will once deployed.

## Deployment

The site is deployed on [Vercel](https://vercel.com) and is live at:

```
https://workout-plan-five-silk.vercel.app
```

Because it's a static site with no build step, Vercel serves the files as-is. To deploy your own copy:

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project** and import the repository.
3. Leave the framework preset as **Other** — there's no build command and the output directory is the project root.
4. Click **Deploy**. Every push to the connected branch redeploys automatically.

Every asset is referenced with a relative path (`css/style.css`, `js/app.js`, `assets/...`), so the site works correctly whether it's hosted at the root of a domain or in a subpath.

## Editing your plan

Open `js/data.js`. Each day is an object in the `days` array; each exercise is an object in that day's `ex` array. Change a `s:"3 × 10–12"` value to adjust sets/reps, edit `steps`/`cue` text, or add/remove exercise objects entirely — `index.html` and `app.js` don't need to change. Refresh the page (or push to GitHub) to see the update.

## Browser support

Built on standard, broadly-supported web platform features (CSS custom properties, `<details>/<summary>`, `clamp()`) with no external requests — it works offline once loaded and loads fast even on a poor gym wifi connection. Tested patterns work across current Chrome, Safari, Firefox, and Edge on both desktop and mobile.
