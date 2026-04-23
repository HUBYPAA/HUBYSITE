import type { Metadata } from "next"
import Link from "next/link"
import {
  getUpcomingConferences,
  getPastConferences,
  getConferenceCount,
  getConferenceMapMarkers,
} from "@/lib/data/query/conferences"
import { formatDateRange } from "@/lib/utils/dates"
import { ConferencesAtlas } from "@/lib/components/vault/conferences-atlas"

export const metadata: Metadata = {
  title: "Conferences · Named as Constellations",
  description:
    "The named weekends of young people's AA — conferences plotted as constellations across the continent.",
}

export default function ConferencesPage() {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()
  const markers = getConferenceMapMarkers()

  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>The constellations</span>
          <span className="sep" aria-hidden />
          <span>Plate III</span>
          <span className="sep" aria-hidden />
          <span>{total} named weekends</span>
        </div>
        <h1 className="section__title">
          A more readable <em>calendar.</em>
        </h1>
        <p className="section__lede">
          Every young people&rsquo;s AA conference we track &mdash; plotted
          on the continent and catalogued below. One calendar. Real dates.
          Real sources. No more piecing a plan together from five group
          chats. Some are ready to book from. Some are scaffolds that still
          need confirmation.
        </p>
      </section>

      <section className="section section--tight">
        <ConferencesAtlas markers={markers} />
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Current calendar</span>
          <span className="sep" aria-hidden />
          <span>{upcoming.length} weekends tracked</span>
        </div>
        <div className="conf-list">
          {upcoming.map((c, i) => (
            <ConferenceRow key={c.slug} conf={c} index={i + 1} />
          ))}
        </div>
      </section>

      {past.length ? (
        <section className="section section--sm">
          <div className="section__eyebrow">
            <span>Archive</span>
            <span className="sep" aria-hidden />
            <span>{past.length} records</span>
          </div>
          <div className="conf-list">
            {past.map((c, i) => (
              <ConferenceRow key={c.slug} conf={c} index={i + 1} past />
            ))}
          </div>
        </section>
      ) : null}
    </>
  )
}

function ConferenceRow({
  conf,
  index,
  past = false,
}: {
  conf: ReturnType<typeof getUpcomingConferences>[number]
  index: number
  past?: boolean
}) {
  return (
    <Link
      href={`/conferences/${conf.slug}`}
      className={`conf-row${past ? " conf-row--past" : ""}`}
    >
      <span className="conf-row__idx">
        /{String(index).padStart(2, "0")}
      </span>
      <span className="conf-row__body">
        <span className="conf-row__title">{conf.title}</span>
        {conf.summary ? (
          <span className="conf-row__summary">{conf.summary}</span>
        ) : null}
      </span>
      <span className="conf-row__when">
        {formatDateRange(conf.startDate, conf.endDate) || "TBA"}
      </span>
      <span className="conf-row__where">
        {[conf.city, conf.stateAbbreviation].filter(Boolean).join(", ") || "—"}
      </span>
    </Link>
  )
}
