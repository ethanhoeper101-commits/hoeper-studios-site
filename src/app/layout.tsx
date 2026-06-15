import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const siteUrl = "https://hoeperstudio.com";
const description =
  "Premium websites for local service businesses. Fast turnaround, SEO optimized, no contracts. Based in Star, Idaho.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hoeper Studios — Web Design for Local Businesses in Idaho",
  description,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Hoeper Studios",
    title: "Hoeper Studios — Web Design for Local Businesses in Idaho",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoeper Studios — Web Design for Local Businesses in Idaho",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${fraunces.variable} font-sans antialiased bg-black text-white`}
      >
        <ScrollProgress />
        <div className="grain-overlay" aria-hidden />
        {children}
      </body>
    </html>
  );
}
