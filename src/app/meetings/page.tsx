import type { Metadata } from "next"
import { MeetingsClient } from "./meetings-client"
import { getMeetingCount, getMeetings, getStatesWithMeetings } from "@/lib/data/query/meetings"

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Find young people's AA meetings across the United States with a calmer, map-first directory.",
}

export default function MeetingsPage() {
  const meetings = getMeetings()
  const meetingCount = getMeetingCount()
  const states = getStatesWithMeetings()

  const stateOptions = states.map((abbreviation) => {
    const match = meetings.find((meeting) => meeting.stateAbbreviation === abbreviation)

    return {
      value: abbreviation,
      label: match?.state ?? abbreviation,
    }
  })

  return (
    <div className="pt-28">
      <section className="site-shell">
        <span className="section-kicker">Meetings</span>
        <h1 className="page-title mt-5 max-w-5xl">
          A cleaner national view of young people&apos;s AA meetings.
        </h1>
        <p className="page-intro mt-5">
          {meetingCount} meetings currently tracked across {states.length} states.
          Use the map when you want orientation first. Use the list when you need
          to scan by city, day, or format.
        </p>
      </section>

      <MeetingsClient meetings={meetings} stateOptions={stateOptions} />
    </div>
  )
}
