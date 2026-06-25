import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Tres Marias — Beauty at Home & Advanced Aesthetics in Clinic",
  description:
    "Salon-quality nail, hair, massage, makeup, lash, and brow services at your home, plus advanced skin, anti-aging, and aesthetic treatments at our clinic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${googleSansFlex.variable} h-full antialiased`}
    >
      <head>
        {/* Material Symbols is an icon font (ligature-based), not a text
            typeface, so it is loaded via a stylesheet link with display=block
            to avoid a flash of raw icon names. next/font is reserved for the
            brand text font above. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,300,0..1,0&display=block"
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
