import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Puppeteer Scraper",
  description: "Next.js Puppeteer Scraper"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
