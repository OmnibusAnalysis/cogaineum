import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cogaineum | RMR",
  description: "An artist portfolio showcasing creative works",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} dark:bg-black dark:text-white`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
