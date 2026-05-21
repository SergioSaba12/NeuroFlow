import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ElyraOs - The cognitive layer for macOS",
  description:
    "A premium macOS cognitive overlay that reduces overload, protects focus and adapts your workspace around your mind.",
  openGraph: {
    title: "ElyraOs - Your Mac, adapted to your mind",
    description:
      "ElyraOs lives above your favorite apps, simplifies information and protects attention before your workspace becomes noise.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ElyraOs - Adaptive technology. Human focus. Endless flow."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ElyraOs - The cognitive layer for macOS",
    description:
      "Adaptive technology. Human focus. Endless flow.",
    images: ["/opengraph-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
