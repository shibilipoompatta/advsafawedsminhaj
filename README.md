# Safa & Minhaj · Wedding Invitation

A romantic floral digital invitation for the wedding of Adv. Safa Janna TK and Muhammed Minhaj NC on 29 November 2026 at NC Convention Centre, Pulparamba, Mukkam, Kozhikode.

The responsive page includes family details, the Nikah and reception schedule, a live countdown, Google Calendar integration, an iCalendar file, Google Maps directions, and native sharing with a copy-link fallback. Floral artwork is served directly from `public/img/`. No visitor information is collected.

## Technologies

TanStack Start (SPA mode), React 19, TypeScript, Vite, Tailwind CSS 4, Lucide icons, and Cloudflare Pages. Typography uses Google Fonts.

## Local development

Use Node 24 and pnpm. Install dependencies with `pnpm install`, then run `pnpm dev` (port 3000). Run `pnpm build` for a production build into `dist/client`.

## Content

Edit `src/routes/index.tsx` for invitation details and `src/styles.css` for presentation. Share metadata lives in `src/routes/__root.tsx` and the site URL lives in `src/lib/site.ts`. Keep `public/safa-minhaj-wedding.ics` in sync when changing dates, times, or location. The event uses UTC values matching Indian Standard Time. Floral artwork lives in `public/img/`.

Deployment is hosted on Cloudflare Pages (`https://advsafawedsminhaj.pages.dev/`).
