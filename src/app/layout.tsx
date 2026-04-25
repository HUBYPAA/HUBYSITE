import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"
import { SiteChrome } from "@/lib/components/site/site-chrome"
import { SiteFooter } from "@/lib/components/site/site-footer"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import { getConferenceCount } from "@/lib/data/query/conferences"
import {
  getMeetingCount,
  getStatesWithMeetings,
} from "@/lib/data/query/meetings"
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
  themeColor: "#F4EBDD",
}

export const metadata: Metadata = {
  title: {
    default: "HUBYPAA · The Living Atlas",
    template: "%s · HUBYPAA",
  },
  description:
    "HUBYPAA helps people find meetings, conferences, events, service paths, and trusted regional information through a modern interface inspired by the luminous painted ceiling of Kościół Mariacki.",
  metadataBase: siteUrl,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const meetingCount = getMeetingCount()
  const conferenceCount = getConferenceCount()
  const stateCount = getStatesWithMeetings().length

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[var(--gilt)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--wood)]"
        >
          Skip to content
        </a>
        <SiteChrome
          meetingCount={meetingCount}
          conferenceCount={conferenceCount}
          stateCount={stateCount}
        />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter
          meetingCount={meetingCount}
          conferenceCount={conferenceCount}
          stateCount={stateCount}
        />
        <VercelRuntime />
      </body>
    </html>
  )
}
