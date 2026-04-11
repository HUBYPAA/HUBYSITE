"use client"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { VercelToolbar } from "@vercel/toolbar/next"

function stripTrackingUrl(input: string): string {
  try {
    const base =
      typeof window === "undefined" ? "https://ypaa.org" : window.location.origin
    return new URL(input, base).pathname
  } catch {
    return input.split("?")[0]?.split("#")[0] ?? input
  }
}

const toolbarEnabledInProduction =
  process.env.NEXT_PUBLIC_ENABLE_VERCEL_TOOLBAR === "1"

const hasLocalToolbarConfig =
  Boolean(process.env.NEXT_PUBLIC_VERCEL_TOOLBAR_PROJECT_ID) &&
  Boolean(process.env.NEXT_PUBLIC_VERCEL_TOOLBAR_SERVER)

const shouldRenderToolbar =
  (process.env.NODE_ENV === "development" && hasLocalToolbarConfig) ||
  toolbarEnabledInProduction

export function VercelRuntime() {
  return (
    <>
      <Analytics
        mode="production"
        beforeSend={(event) => ({
          ...event,
          url: stripTrackingUrl(event.url),
        })}
      />
      <SpeedInsights
        sampleRate={1}
        beforeSend={(event) => ({
          ...event,
          route: event.route ?? stripTrackingUrl(event.url),
          url: stripTrackingUrl(event.url),
        })}
      />
      {shouldRenderToolbar ? <VercelToolbar /> : null}
    </>
  )
}
