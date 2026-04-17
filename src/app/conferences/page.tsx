import type { Metadata } from "next"
import { ConferencesExplorer } from "./conferences-explorer"
import { getConferenceCount, getPastConferences, getUpcomingConferences } from "@/lib/data/query/conferences"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Upcoming and past YPAA conferences with map context, cleaner scanning, and room for better records over time.",
}

export default function ConferencesPage() {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()

  return (
    <div>
      <PortalHeader
        glyph="star-diamond"
        kicker="the conferences"
        title="A more readable calendar."
        subtitle={`${total} records · ${upcoming.length} upcoming · ${past.length} archived. Some are ready to plan from. Some are scaffolds that still need confirmation.`}
        ribbonSeed={47}
      />

      <ConferencesExplorer upcoming={upcoming} past={past} />
    </div>
  )
}
