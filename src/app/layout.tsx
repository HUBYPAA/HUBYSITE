import { Header } from "@/lib/components/layout/header"
import { Footer } from "@/lib/components/layout/footer"
import { MobileBottomBar } from "@/lib/components/layout/mobile-bottom-bar"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "maplibre-gl/dist/maplibre-gl.css"
import { VercelRuntime } from "./vercel-runtime"

const siteUrl = resolveSiteUrl()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#edf2ef",
}

export const metadata: Metadata = {
  title: {
    default: "YPAA",
    template: "%s | YPAA",
  },
  description:
    "A map-first directory for young people's AA meetings, conferences, and trusted starting points across the United States.",
  metadataBase: siteUrl,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ground text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="relative z-10">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <VercelRuntime />
      </body>
    </html>
  )
}
