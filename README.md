# amritsc.github.io

Personal site for Amrit Chauhan, built with React, Vite and Framer Motion and deployed to GitHub Pages on every push to `main`.

## Editing content

All copy lives in `src/data.js`: experience, certifications, agents, the hero trace and the banner. Layout code doesn't need to change for content updates.

- **Banner logos:** add an SVG to `public/logos/` and set `logo: '/logos/<file>.svg'` on the matching entry in `places`. Entries without a logo render as typeset names.
- **Open builds:** any public repo tagged with the `portfolio` topic on GitHub appears in the Builds section automatically.

## Run locally

```bash
npm ci
npm run dev
```

## Stack

React 18, Vite 5, Framer Motion 11, Bricolage Grotesque and Instrument Sans (Fontsource), Simple Icons.
