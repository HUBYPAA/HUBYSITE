import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/lib/components/layout/header"
import { Footer } from "@/lib/components/layout/footer"
import { MobileBottomBar } from "@/lib/components/layout/mobile-bottom-bar"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "maplibre-gl/dist/maplibre-gl.css"
import { VercelRuntime } from "./vercel-runtime"

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
})

const siteUrl = resolveSiteUrl()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a1008",
}

export const metadata: Metadata = {
  title: {
    default: "HUBYPAA",
    template: "%s · HUBYPAA",
  },
  description:
    "A map-first directory for young people's AA meetings, conferences, and trusted starting points across the United States.",
  metadataBase: siteUrl,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-[var(--color-accent)] focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pt-[3.5rem]">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <VercelRuntime />
      </body>
    </html>
  )
}
