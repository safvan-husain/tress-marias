import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Google_Sans_Flex } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Google Sans Flex is used only for the service cards.
const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Tres Marias — Beauty & Wellness Home Services",
  description:
    "Professional nail, hair, massage, makeup, lash, and brow services brought to the comfort of your home.",
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
      className={`${playfair.variable} ${dmSans.variable} ${googleSansFlex.variable} h-full antialiased`}
    >
      <head>
        {/* Material Symbols is an icon font (ligature-based), not a text
            typeface, so it is loaded via a stylesheet link with display=block
            to avoid a flash of raw icon names. next/font is reserved for the
            brand text fonts above. */}
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
