import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import ErrorBoundary from "@/components/ErrorBoundary"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Cogaineum | RMR",
    template: "%s | Cogaineum"
  },
  description: "An artist portfolio showcasing creative works and digital art by RMR. Explore unique pieces, contact for commissions, and support the artist through donations.",
  keywords: ["artist", "portfolio", "digital art", "RMR", "Cogaineum", "art", "commission", "donate"],
  authors: [{ name: "RMR" }],
  creator: "RMR",
  publisher: "Cogaineum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://cogaineum.art"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cogaineum | RMR",
    description: "An artist portfolio showcasing creative works and digital art by RMR. Explore unique pieces, contact for commissions, and support the artist through donations.",
    url: "https://cogaineum.art",
    siteName: "Cogaineum",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cogaineum Art Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogaineum | RMR",
    description: "An artist portfolio showcasing creative works and digital art by RMR. Explore unique pieces, contact for commissions, and support the artist through donations.",
    images: ["/twitter-image.jpg"],
    creator: "@cogaineum",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} dark:bg-black dark:text-white`} suppressHydrationWarning>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
