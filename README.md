# আড্ডা FM

Minimalist curated Bengali music listening page — a single page. No song
storage — everything streams from one YouTube playlist via the YouTube
IFrame API, wrapped in a custom transparent-skin player with a spinning
disc.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000

## Swap in the real playlist

Edit `data/playlists.ts` and replace the placeholder ID with your real
YouTube playlist ID (the part after `list=` in a playlist URL).

## Swap in the real background image

Drop your own image at `public/images/bg-main.png` — same filename, no
code changes needed. It's shown desaturated via CSS (`filter: grayscale`),
so a color photo works fine too.

## Edit trivia

`data/trivia.ts` holds one array (`trivia`), each item `{ bn, en }`.
Add/remove/reorder freely — the prev/next buttons cycle through
whatever is in the array, wrapping at both ends.

## Deploy

**Vercel (recommended — zero config for Next.js):**
1. Push this repo to GitHub.
2. Import it at vercel.com/new.
3. Framework preset auto-detects Next.js. Deploy.

**GitHub Pages (automated, via the included workflow):**
1. Confirm your repo name matches `REPO_NAME` at the top of
   `next.config.js` (currently set to `adda-fm`). If your actual repo
   is named something else, change that one line.
2. On GitHub: Settings → Pages → Source → **GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` builds a static
   export and deploys it automatically — no `gh-pages` branch, no
   manual steps after this.
4. Site will be live at `https://YOUR-USERNAME.github.io/adda-fm/`.

To build the static export locally (e.g. to preview `out/` before
pushing):
```
GITHUB_PAGES=true npm run build
```

Vercel is simpler if you don't specifically need GitHub Pages —
no basePath juggling, no export step.

## Structure

```
app/
  layout.tsx          fonts (Tiro Bangla + Noto Sans Bengali) + metadata
  page.tsx             the whole page: bg, title, clock, disc icon, trivia, player
  globals.css          design tokens, glow, layout
components/
  Player.tsx            YouTube IFrame API wrapper + custom transparent controls
  Trivia.tsx             prev/next trivia strip
  Clock.tsx
  DiscIcon.tsx
data/
  playlists.ts           playlist ID (placeholder — swap this)
  trivia.ts               trivia content, bn + en
lib/
  basePath.ts             GitHub Pages sub-path helper (no-op on Vercel)
public/images/
  bg-main.png             background photo (placeholder — swap this)
.github/workflows/
  deploy.yml               builds + deploys to GitHub Pages on push to main
```
