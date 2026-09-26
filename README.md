# golfsinteppadon.com

A single static page. There's no build step and nothing to install.

- `index.html` is the page
- `style.css` holds all the styles
- `images/` and `fonts/` hold the assets

## Local preview

```bash
python3 -m http.server
```

Then open http://localhost:8000. The root-relative paths (`/style.css`) need a server; opening the file directly won't load them.

## Deploy

Vercel serves the repo root as-is. `vercel.json` sets the framework to "Other" so Vercel doesn't try to run a build. Web Analytics loads from `/_vercel/insights/script.js`, which Vercel serves when Analytics is enabled for the project.
