// On Vercel/local dev this is "". On a GitHub Pages build (see
// next.config.js) it's "/<repo-name>". Prefix any local /public path
// with this before using it in a raw url()/src string — Next only
// auto-prefixes next/image and next/link, not inline styles.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
