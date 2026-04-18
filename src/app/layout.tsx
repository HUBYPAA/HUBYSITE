import { Inter, Fraunces } from "next/font/google"
import { Header } from "@/lib/components/layout/header"
import { Footer } from "@/lib/components/layout/footer"
import { MobileBottomBar } from "@/lib/components/layout/mobile-bottom-bar"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import "maplibre-gl/dist/maplibre-gl.css"
import { VercelRuntime } from "./vercel-runtime"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
})

const siteUrl = resolveSiteUrl()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2347a8",
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:bg-[var(--color-vault)] focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pt-[3.75rem]">
          {children}
        </main>
        <Footer />
        <MobileBottomBar />
        <VercelRuntime />
      </body>
    </html>
  )
}
