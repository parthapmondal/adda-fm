# আড্ডা FM — multi-genre version

Minimalist curated Bengali music listening site with five genre pages —
`/90s-classics` (jibanmukhi-era songs), `/bangla-band`, `/retro`
(1950s–70s Bengali film music golden age), `/folk` (Baul/Bhatiali/
Bhawaiya), and `/pujo` — each with its own background, accent glow
color, and YouTube playlist, plus a row of separate pill buttons to
switch between them. `/` shows the first genre directly. No song
storage — everything streams from YouTube playlists via the YouTube
IFrame API, wrapped in a custom transparent-skin player. Shows the
currently playing song's title, artist, album art, and position in
the playlist (via YouTube's oEmbed API — no API key needed); has loop
and shuffle, a burger-menu song list, a volume control, and full
keyboard shortcuts. Two-row layout on mobile with larger touch
targets. Share links get a proper preview card (Open Graph/Twitter
image) and a matching favicon. Single font (Tiro Bangla) throughout.
A live "listeners online" badge sits under the clock (Vercel + Redis
only — see below).

## Keyboard shortcuts

| Key | Action |
|---|---|
| Space | Play / pause |
| ← / → | Previous / next track |
| ↑ / ↓ | Volume up / down |
| M | Mute |
| L | Loop all |
| S | Shuffle |
| Esc | Close song list |

This is genre-count-agnostic: add a sixth, seventh genre by editing
one file (see below) — no routing code to touch.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:3000

## Add / edit genres

Everything about a genre lives in one object in `data/genres.ts`:

```ts
{
  slug: "adhunik",                          // becomes the URL: /adhunik
  label: "আধুনিক",                          // shown in the pill switcher
  bgImage: "/images/bg-adhunik.png",        // must exist under public/images/
  accent: "#c9679a",                        // glow + active-pill color
  accentSoft: "rgba(201, 103, 154, 0.35)",  // same color, ~35% alpha
  playlist: {
    id: "YOUR_PLAYLIST_ID",
    url: "https://music.youtube.com/playlist?list=YOUR_PLAYLIST_ID",
  },
}
```

Add that object to the `genres` array, drop the matching image into
`public/images/`, and the page + switcher pill appear automatically —
`generateStaticParams` builds a route per genre at build time.

## Swap in real playlists

Replace the placeholder `playlist.id` / `playlist.url` for each genre
in `data/genres.ts` with real YouTube playlist IDs (the part after
`list=` in a playlist URL).

## Swap in real background images

Replace the five placeholder images under `public/images/` —
`bg-90s-classics.png`, `bg-bangla-band.png`, `bg-retro.png`,
`bg-folk.png`, `bg-pujo.png` — with the same filenames (or update
`bgImage` per genre in `data/genres.ts` if you rename them).

## Live listener counter

The small "how many people are online now" badge under the clock reads
this project's Redis storage on Vercel — so it only works on a normal
Vercel deploy, **not** the GitHub Pages static export (there's no
server there to talk to). The GitHub Actions workflow removes
`app/api/` before that build for exactly this reason; the badge just
won't appear on the GitHub Pages copy of the site, and the Vercel copy
is unaffected.

It reads whichever of these two env-var pairs is present, so it works
regardless of how your Redis store got connected:
- `KV_REST_API_URL` / `KV_REST_API_TOKEN` (Vercel's own Storage tab)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (a raw Upstash connection)

If neither pair is set, `/api/presence` just returns a null count and
the badge stays hidden — nothing breaks.

Each open tab counts as "online" for 45 seconds after its last
heartbeat (sent every 20s), so the count is a live approximation, not
a strict unique-visitor count.

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
3. Push to `main`. `.github/workflows/deploy.yml` strips `app/api/`
   (the live-counter endpoint — see above) then builds a static export
   (every genre pre-rendered as its own HTML page) and deploys it
   automatically — no `gh-pages` branch, no manual steps after this.
4. Site will be live at `https://YOUR-USERNAME.github.io/adda-fm/`,
   with each genre at `.../adda-fm/90s-classics`, `.../adda-fm/retro`,
   `.../adda-fm/bangla-band`, `.../adda-fm/folk`, `.../adda-fm/pujo`.

To build the static export locally (e.g. to preview `out/` before
pushing):
```
GITHUB_PAGES=true npm run build
```

## Structure

```
app/
  layout.tsx          font (Tiro Bangla, used everywhere) + metadata
  page.tsx             renders the first genre directly at "/"
  [genre]/page.tsx      one static route per genre (generateStaticParams)
  globals.css           design tokens, glow, layout, mobile layout
  icon.png               favicon (auto-detected by Next.js)
  apple-icon.png          iOS home-screen icon (auto-detected by Next.js)
  api/presence/route.ts    live-listener heartbeat endpoint (Vercel only — see above)
components/
  GenreShell.tsx          composes one genre's full page
  GenreSwitcher.tsx        pill nav across all genres (next/link, basePath-safe)
  Player.tsx                YouTube IFrame API wrapper + custom transparent controls:
                             now-playing title/artist/album art/song count, loop,
                             shuffle, volume, keyboard shortcuts, error auto-skip,
                             circuit-breaker for fully embed-blocked playlists
  PlaylistMenu.tsx           burger-menu song list (slide-in panel)
  OnlineCounter.tsx           live listener badge (hides itself if Redis isn't configured)
  Clock.tsx
  DiscIcon.tsx
data/
  genres.ts               single source of truth: one object per genre
                           (currently 90s-classics, bangla-band, retro, folk, pujo)
lib/
  basePath.ts              GitHub Pages sub-path helper (no-op on Vercel)
  youtubeMeta.ts            oEmbed-based title/artist/thumbnail fetcher (no API key)
public/
  og-image.png              share-preview image (WhatsApp/Twitter/etc.)
  images/
    bg-90s-classics.png       placeholder — swap this
    bg-bangla-band.png        placeholder — swap this
    bg-retro.png               placeholder — swap this
    bg-folk.png                 placeholder — swap this
    bg-pujo.png                  placeholder — swap this
.github/workflows/
  deploy.yml               builds + deploys to GitHub Pages on push to main
                            (strips app/api/ first — see live counter note above)
```
