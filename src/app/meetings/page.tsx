import type { Metadata } from "next"
import { getMeetings, getMeetingCount, getStatesWithMeetings } from "@/lib/data/query/meetings"
import { MeetingsClient } from "./meetings-client"

export const metadata: Metadata = {
  title: "Meetings · The Stellar Index",
  description:
    "Every young people's AA meeting catalogued as a star. Filter by schedule, format, region, or proximity.",
}

export default function MeetingsPage() {
  const meetings = getMeetings()
  const n = getMeetingCount()
  const states = getStatesWithMeetings()
  return (
    <MeetingsClient meetings={meetings} totalCount={n} stateCount={states.length} />
  )
}