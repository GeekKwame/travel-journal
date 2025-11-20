# Travel Journal

A responsive travel journal built with React + Vite. The site showcases memorable trips with immersive photography, polished card layouts, and quick links to the locations on Google Maps.

## Features

- 📍 Data-driven entries sourced from `data.js`
- 🗺️ External Google Maps links that open safely in new tabs
- 🖼️ Lazy-loaded hero images and inline SVG markers for optimal performance
- ✨ Responsive, modern design with elevated cards and gradients
- ⚡ Built with Vite for fast dev experience and optimized builds

## Getting Started

```bash
git clone <your-repo-url>
cd Travel_Journal
npm install
npm run dev
```

Visit the printed `http://localhost:<5173>` URL from the Vite dev server (ports may auto-increment if already in use).

## Available Scripts

- `npm run dev` – start the Vite dev server
- `npm run build` – create a production build in `dist/`
- `npm run preview` – preview the production build locally

## Project Structure

```
src/
├── App.jsx            # Root layout, renders header + entries
├── components/
│   ├── Header.jsx     # Hero banner with globe icon + title
│   └── Entry.jsx      # Travel entry card
├── data.js            # Array of travel entries
├── index.css          # Global + component styles
└── index.jsx          # Entry point / React root
public/
└── marker.svg         # Map-pin icon used in entries
```

## Deployment Notes

The project builds cleanly with `npm run build`. Commit the `src/`, `public/`, and config files (exclude `node_modules/`), then push to GitHub. Deploy the generated `dist/` folder with any static host (Netlify, Vercel, GitHub Pages, etc.).

