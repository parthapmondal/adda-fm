import type { Metadata, Viewport } from "next";
import { Tiro_Bangla } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { basePath } from "@/lib/basePath";

// Single font used everywhere Bengali text appears — title and body
// alike. Tiro Bangla only ships one weight (400 regular), no bold.
const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-bengali",
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in your Vercel project (or wherever you
// deploy) to your real domain once you have one — needed for share
// previews (WhatsApp/Twitter/etc.) to resolve the OG image correctly.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://addafm.vercel.app";
const title = "\u0986\u09a1\u09cd\u09a1\u09be FM";
const description =
  "\u09a8\u09ac\u09cd\u09ac\u0987 \u09a5\u09c7\u0995\u09c7 \u09a6\u09c1\u09b9\u09be\u099c\u09be\u09b0 \u09a6\u09b6\u0995\u09c7\u09b0 \u099c\u09c0\u09ac\u09a8\u09ae\u09c1\u0996\u09c0 \u0993 \u09ac\u09be\u0982\u09b2\u09be \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u09c7\u09b0 \u0997\u09be\u09a8 \u09b6\u09cb\u09a8\u09be\u09b0 \u098f\u0995 \u099a\u09c7\u09a8\u09be \u0986\u09a1\u09cd\u09a1\u09be\u0964";
const ogImage = `${basePath}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    images: [{ url: ogImage, width: 1200, height: 630 }],
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={tiroBangla.variable}>
        {children}
      </body>
    </html>
  );
}
