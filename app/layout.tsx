import type { Metadata } from "next";
import { Tiro_Bangla, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-tiro-bengali",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "\u0986\u09a1\u09cd\u09a1\u09be FM",
  description:
    "\u09a8\u09ac\u09cd\u09ac\u0987 \u09a5\u09c7\u0995\u09c7 \u09a6\u09c1\u09b9\u09be\u099c\u09be\u09b0 \u09a6\u09b6\u0995\u09c7\u09b0 \u099c\u09c0\u09ac\u09a8\u09ae\u09c1\u062e\u09c0 \u0993 \u09ac\u09be\u0982\u09b2\u09be \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u09c7\u09b0 \u0997\u09be\u09a8 \u09b6\u09cb\u09a8\u09be\u09b0 \u098f\u0995 \u099a\u09c7\u09a8\u09be \u0986\u09a1\u09cd\u09a1\u09be\u0964",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${tiroBangla.variable} ${notoSansBengali.variable}`}>
        {children}
      </body>
    </html>
  );
}
