import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"
import { Chrome } from "@/lib/components/vault/chrome"
import { HudBottom } from "@/lib/components/vault/hud-bottom"
import { Tabbar } from "@/lib/components/vault/tabbar"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { VercelRuntime } from "./vercel-runtime"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const siteUrl = resolveSiteUrl()

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F2233",
}

export const metadata: Metadata = {
  title: {
    default: "HUBY/AA — The Vault",
    template: "%s · HUBY/AA",
  },
  description:
    "A sky of meetings. Two hundred and forty-seven young people's AA meetings and fourteen conferences, plotted against the hour.",
  metadataBase: siteUrl,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:bg-[var(--gold)] focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--ink)]"
        >
          Skip to content
        </a>
        <Chrome />
        <main id="main">{children}</main>
        <HudBottom />
        <Tabbar />
        <VercelRuntime />
      </body>
    </html>
  )
}