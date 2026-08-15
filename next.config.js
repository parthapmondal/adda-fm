/**
 * REPO_NAME must match your actual GitHub repo name (the part after
 * github.com/username/ ). It's only used for the GitHub Pages build
 * (output: 'export'), and only when the GITHUB_PAGES env var is set —
 * so it has zero effect on `next dev` or a Vercel deploy.
 */
const REPO_NAME = "adda-fm";
const isGhPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? `/${REPO_NAME}` : "",
  },
  ...(isGhPages && {
    output: "export",
    basePath: `/${REPO_NAME}`,
    assetPrefix: `/${REPO_NAME}/`,
    images: { unoptimized: true },
  }),
};

module.exports = nextConfig;
