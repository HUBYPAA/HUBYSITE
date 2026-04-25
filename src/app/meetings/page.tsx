import type { Metadata } from "next"
import {
  getMeetings,
  getMeetingCount,
  getStatesWithMeetings,
} from "@/lib/data/query/meetings"
import { MeetingsClient } from "./meetings-client"

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Find young people's AA meetings across the United States with a fast, mobile-first recovery atlas.",
}

export default function MeetingsPage() {
  const meetings = getMeetings()
  const totalCount = getMeetingCount()
  const states = getStatesWithMeetings()

  return (
    <MeetingsClient
      meetings={meetings}
      totalCount={totalCount}
      stateCount={states.length}
      states={states}
    />
  )
}
