# Shraddha Tole · Data Science Portfolio

Personal portfolio built with **React + Vite**, **Recharts** and **Framer Motion**, deployed to GitHub Pages:
**https://shraddhatole.github.io/Portfolio/**

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173/Portfolio/
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Editing content

| What | Where |
|---|---|
| Name, bio, stats, experience, education, skills, contact | `src/data/profile.js` |
| Projects (text, metrics, links, filter tags) | `src/data/projects.js` |
| Playground data | `src/data/playground/*.json` |
| Photo | `public/profile.jpg` (the "ST" monogram shows until it exists) |
| CV | `public/Shraddha_Tole_CV.pdf` |
| Colours / layout | `src/index.css` (tokens at the top) |

## Before publishing: checklist

- [ ] Add `public/profile.jpg` (portrait, roughly 4:5)
- [ ] Confirm the `availability` / visa line in `src/data/profile.js`
- [ ] **Replace the sample Playground data.** Both JSON files are currently `"sample": true`
      (the site shows an "illustrative data" note). Run the functions in
      `scripts/export_playground_data.py` inside the FraudLens and ShellScope notebooks, then copy the
      generated JSON into `src/data/playground/`. The note disappears automatically.
- [ ] Add the DR. CNN GitHub link in `src/data/projects.js` if the repo is public
- [ ] Tidy the Healthcare repos (README with findings, rename `Untitled.ipynb` / `old.ipynb`), because recruiters click through

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
One-time setup: in the repo go to **Settings → Pages → Source → GitHub Actions**.
