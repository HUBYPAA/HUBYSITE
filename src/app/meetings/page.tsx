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
  const formatCount = new Set(meetings.map((meeting) => meeting.format)).size

  const stateOptions = states.map((abbreviation) => {
    const match = meetings.find((meeting) => meeting.stateAbbreviation === abbreviation)

    return {
      value: abbreviation,
      label: match?.state ?? abbreviation,
    }
  })

  return (
    <div className="pt-24 sm:pt-28">
      <section className="site-shell">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <section className="panel-raised rise-in relative overflow-hidden p-5 sm:p-7 md:p-9">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(45,107,94,0.12),transparent_44%),radial-gradient(circle_at_top_right,rgba(200,164,78,0.12),transparent_36%)]" />
            <div className="relative z-10">
              <span className="section-kicker">Meetings</span>
              <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
                A cleaner national view of young people&apos;s AA meetings.
              </h1>
              <p className="page-intro mt-3 sm:mt-5">
                {meetingCount} meetings currently tracked across {states.length} states.
                Use the map when you want orientation first. Use the list when you
                need to scan by city, day, or format.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
                {["Map first", "Fast filters", "Low-noise scan"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-[0.75rem] border border-ink/8 bg-panel/60 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            <section className="panel rise-in p-5 sm:p-6">
              <p className="meta-label">Directory scale</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
                <div className="stat-pair">
                  <strong className="!text-[var(--color-gold)]">{meetingCount}</strong>
                  <span>Meetings</span>
                </div>
                <div className="stat-pair">
                  <strong className="!text-[var(--color-gold)]">{states.length}</strong>
                  <span>States</span>
                </div>
                <div className="stat-pair">
                  <strong className="!text-[var(--color-gold)]">{formatCount}</strong>
                  <span>Formats</span>
                </div>
              </div>
            </section>

            <section className="panel-outline rise-in p-5 sm:p-6">
              <p className="meta-label">Best way to use it</p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Start wide. Let geography do the first cut. Only reach for search
                and filters when you actually need precision.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="site-shell mt-6">
        <div className="processional-divider" />
      </section>

      <MeetingsClient meetings={meetings} stateOptions={stateOptions} />
    </div>
  )
}
