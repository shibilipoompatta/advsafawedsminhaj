# Safa & Minhaj · Wedding Invitation

A romantic floral digital invitation for the wedding of Adv. Safa Janna TK and Muhammed Minhaj NC on 29 November 2026 at NC Convention Centre, Pulparamba, Mukkam, Kozhikode.

The responsive page includes family details, the Nikah and reception schedule, a live countdown, an iCalendar download, Google Maps directions, and native sharing with a copy-link fallback. Decorative watercolor artwork is served through Netlify Image CDN. No visitor information is collected.

## Technologies

TanStack Start, React 19, TypeScript, Vite, Tailwind CSS 4, Lucide icons, and Netlify. Typography uses Google Fonts.

## Local development

Use Node 24 and pnpm. Install dependencies with `pnpm install`, then run `netlify dev --port 8889`. Netlify CLI provides the framework server and local image CDN integration.

## Content

Edit `src/routes/index.tsx` for invitation details and `src/styles.css` for presentation. Share metadata lives in `src/routes/__root.tsx`. Keep `public/safa-minhaj-wedding.ics` in sync when changing dates, times, or location. The event uses UTC values matching Indian Standard Time. Floral artwork lives in `public/img/`.

Builds and deployment are handled by Netlify using the configuration in `netlify.toml`.
