# amritsc.github.io

Personal site for Amrit Chauhan, built with React, Vite, Tailwind CSS, Framer Motion and Three.js, and deployed to GitHub Pages on every push to `main`.

## Where things live

- `src/App.jsx`: every section and its content (about, projects, agents, experience, certifications, contact)
- `src/components/logos.jsx`: company logos used in Experience and the banner
- `src/components/Banner.jsx`: the scrolling logo, focus-area and tool rows
- `src/components/Particles.jsx`: the WebGL particle background that changes shape per section
- `src/components/Trace.jsx` and `src/data.js`: the simulated orchestrator run
- `src/components/LiveRepos.jsx`: any public repo tagged with the `portfolio` topic shows up under Projects automatically

## Performance

Phones and low-power devices get fewer particles, a lower render resolution, 30fps rendering and no live blur. The background also measures real frame times and steps its quality down further if a device struggles.

## Run locally

```bash
npm ci
npm run dev
```
