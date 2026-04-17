import { Cormorant_Garamond } from "next/font/google"
import { Header } from "@/lib/components/layout/header"
import { Footer } from "@/lib/components/layout/footer"
import { MobileBottomBar } from "@/lib/components/layout/mobile-bottom-bar"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "maplibre-gl/dist/maplibre-gl.css"
import { VercelRuntime } from "./vercel-runtime"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-loaded",
  display: "swap",
})

const siteUrl = resolveSiteUrl()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#8a2f1e",  // brick-deep — matches the header
}

export const metadata: Metadata = {
  title: {
    default: "HUBYPAA",
    template: "%s | HUBYPAA",
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
    <html lang="en" className={cormorant.variable}>
      <body
        className="min-h-screen bg-ground text-ink"
        style={{
          // Promote the loaded webfont into the serif/display stacks.
          ["--font-display" as string]: `var(--font-display-loaded), "Palatino Linotype", "Book Antiqua", "Iowan Old Style", serif`,
          ["--font-serif" as string]: `var(--font-display-loaded), "Palatino Linotype", "Book Antiqua", "Iowan Old Style", "Times New Roman", serif`,
        }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-[var(--radius-sm)] focus:bg-[var(--color-brick-deep)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--color-ivory)]"
        >
          skip to content
        </a>
        <Header />
        <main id="main-content" className="relative z-10 pt-[4.5rem]">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <VercelRuntime />
      </body>
    </html>
  )
}
