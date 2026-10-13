# Aditya Bhoite — Data Science portfolio (exported from Lovable)

Stack: TanStack Start (server-rendered React 19), Vite, Tailwind CSS v4, shadcn/ui.

## Prerequisites

- Node.js 20 or newer, and npm (or Bun).

## Run locally

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
   (this also generates `src/routeTree.gen.ts`, which is not included in this export)
3. Optional: `npm run test`, `npm run lint`, `npm run build`

## What to edit

- `src/data/site.ts` — email, LinkedIn, resume URL, photos
- `src/data/projects.ts` and `src/data/study-presentation.ts` — case-study content and stats
- `src/data/terms.ts` — hover-to-decode slang terms
- `src/data/toolkit.ts`, `hobbies.ts`, `progress.ts` — the other sections
- `src/styles.css` — all styling, including the data-trail line
- `public/resume.pdf` — the resume linked in the navigation
- `public/us-labor-market-dashboard.pbit` — the supplied Power BI template (requires Power BI and its source data; it is not an embeddable report)

Technology marks in `public/tool-icons/` are local SVGs from Simple Icons (CC0), Devicon (MIT; see its included license), and Microsoft's Power BI Icons (CC BY 4.0). The Power BI icon source is credited below the toolkit on the site.

## Not included

- 44 unused stock shadcn components in `src/components/ui/` (only button, accordion, sheet and tooltip are used and are included). Add others with `npx shadcn@latest add <name>`.
- `bun.lock` and `src/routeTree.gen.ts` (both regenerated automatically).
- Lovable's internal notes (`AGENTS.md`, `roadmap.md`).

## Deploy with GitHub Pages

The repository is configured to build as a client-rendered static site and deploy automatically to GitHub Pages whenever code is pushed to `main`. A `404.html` fallback lets the client router handle project deep links.

1. Create a **public** repository named `AdityaBhoite20.github.io` under the GitHub account `AdityaBhoite20`.
2. Push this project to that repository's `main` branch.
3. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
4. Wait for the **Deploy portfolio to GitHub Pages** workflow to finish. The site will be available at `https://adityabhoite20.github.io`.

The site uses TanStack Start's SPA shell because GitHub Pages does not run the server-side renderer. `public/resume.pdf` is served from the same GitHub Pages host, so opening the resume uses the deployed site URL rather than a local development address.
