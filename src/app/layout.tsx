import { Header } from "@/lib/components/layout/header"
import { Footer } from "@/lib/components/layout/footer"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { Metadata, Viewport } from "next"
import "maplibre-gl/dist/maplibre-gl.css"
import "./globals.css"
import { VercelRuntime } from "./vercel-runtime"

const siteUrl = resolveSiteUrl()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0b0d",
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="relative z-10">
          {children}
        </main>
        <Footer />
        <VercelRuntime />
      </body>
    </html>
  )
}
