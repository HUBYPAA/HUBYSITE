import type { Metadata } from "next"
import { getMeetings, getMeetingCount, getStatesWithMeetings } from "@/lib/data/query/meetings"
import { MeetingsClient } from "./meetings-client"

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Find young people's AA meetings across the United States with a calmer, map-first directory.",
}

export default function MeetingsPage() {
  const meetings = getMeetings()
  const n = getMeetingCount()
  const states = getStatesWithMeetings()
  return (
    <MeetingsClient meetings={meetings} totalCount={n} stateCount={states.length} />
  )
}