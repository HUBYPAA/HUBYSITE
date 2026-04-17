import type { Metadata } from "next"
import { MeetingsClient } from "./meetings-client"
import { getMeetingCount, getMeetings, getStatesWithMeetings } from "@/lib/data/query/meetings"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Find young people's AA meetings across the United States with a calmer, map-first directory.",
}

export default function MeetingsPage() {
  const meetings = getMeetings()
  const meetingCount = getMeetingCount()
  const states = getStatesWithMeetings()
  const formatCount = new Set(meetings.map((meeting) => meeting.format)).size

  const stateOptions = states.map((abbreviation) => {
    const match = meetings.find((meeting) => meeting.stateAbbreviation === abbreviation)
    return {
      value: abbreviation,
      label: match?.state ?? abbreviation,
    }
  })

  return (
    <div>
      <PortalHeader
        glyph="shield-cross"
        kicker="the meetings"
        title="A cleaner national view."
        subtitle={`${meetingCount} rooms · ${states.length} states · ${formatCount} formats — map first, list when you need precision.`}
        ribbonSeed={31}
      />

      <MeetingsClient meetings={meetings} stateOptions={stateOptions} />
    </div>
  )
}
