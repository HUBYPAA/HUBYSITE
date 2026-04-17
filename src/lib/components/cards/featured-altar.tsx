import Link from "next/link"
import type { Conference } from "@/lib/data/normalized/types"
import { formatDateRange } from "@/lib/utils/dates"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { StellarCorners } from "@/lib/components/ornaments/stellar-corners"

interface FeaturedAltarProps {
  conference: Conference
  /** "compact" for the home page, "full" for conference detail */
  variant?: "compact" | "full"
}

/**
 * The Veit Stoss altarpiece, as a card.
 * Pentaptych structure: two wings flanking a central panel,
 * with a linden-wood predella beneath. Carved frame, ruby halo,
 * gilt corner stars, and the kind of typographic investment that
 * tells you this is the focal terminus of the page.
 */
export function FeaturedAltar({ conference, variant = "compact" }: FeaturedAltarProps) {
  const dateRange = formatDateRange(conference.startDate, conference.endDate)
  const location = [conference.venue, conference.city, conference.stateAbbreviation]
    .filter(Boolean)
    .join(" · ")

  return (
    <article className={`panel-vault relative ${variant === "full" ? "p-6 sm:p-9" : "p-5 sm:p-7"}`}>
      <StellarCorners />

      {/* Kicker */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="section-kicker section-kicker--vault">
          <HeraldicGlyph name="star-diamond" />
          this month&apos;s altar
        </span>
        {conference.notes?.toLowerCase().includes("scaffold") ? (
          <span
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-gilt-shadow)] px-3 py-1 text-[0.66rem]"
            style={{
              color: "var(--color-gilt-soft)",
              background: "rgba(196,138,26,0.08)",
              fontFamily: "var(--font-serif)",
              fontVariantCaps: "all-small-caps",
              letterSpacing: "0.16em",
            }}
          >
            still being wired
          </span>
        ) : null}
      </div>

      {/* Pentaptych row */}
      <div className={`mt-6 grid gap-4 ${variant === "full" ? "md:grid-cols-[0.7fr_1.6fr_0.7fr]" : "md:grid-cols-[0.6fr_1.5fr_0.7fr]"}`}>
        {/* LEFT WING — date */}
        <div
          className="rounded-[var(--radius-sm)] border border-[var(--color-debnik)] p-4"
          style={{
            background: "linear-gradient(180deg, rgba(17,27,74,0.65), rgba(17,27,74,0.92))",
          }}
        >
          <p className="meta-label" style={{ color: "var(--color-gilt-shadow)" }}>weekend</p>
          <p
            className="mt-2 text-[var(--color-ivory)]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: variant === "full" ? "1.5rem" : "1.2rem",
              lineHeight: 1.1,
            }}
          >
            {dateRange || "dates pending"}
          </p>
          {conference.city ? (
            <p className="mt-3 text-[0.78rem] text-[rgba(241,233,214,0.62)] smallcaps">
              {conference.city}
              {conference.stateAbbreviation ? ` · ${conference.stateAbbreviation}` : ""}
            </p>
          ) : null}
        </div>

        {/* CENTRAL PANEL — title + body */}
        <div className="relative px-2 sm:px-4">
          <p className="meta-label" style={{ color: "var(--color-gilt-shadow)" }}>conference</p>
          <Link href={`/conferences/${conference.slug}`} className="group inline-block">
            <h2
              className={`mt-3 text-[var(--color-gilt)] transition-colors group-hover:text-[var(--color-gilt-lit)]`}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: variant === "full" ? "clamp(2.4rem,5vw,3.6rem)" : "clamp(1.85rem,4vw,2.6rem)",
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                textWrap: "balance",
              }}
            >
              {conference.title}
            </h2>
          </Link>
          {conference.summary ? (
            <p
              className="mt-4 max-w-[36rem] text-[rgba(241,233,214,0.78)]"
              style={{
                fontFamily: "var(--font-prose)",
                fontSize: variant === "full" ? "1.05rem" : "0.96rem",
                lineHeight: 1.78,
              }}
            >
              {conference.summary}
            </p>
          ) : (
            <p
              className="mt-4 max-w-[36rem] text-[rgba(241,233,214,0.7)]"
              style={{
                fontFamily: "var(--font-prose)",
                fontStyle: "italic",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              A weekend, a host city, the people you already love and a whole
              lot you&rsquo;re about to.
            </p>
          )}
        </div>

        {/* RIGHT WING — action */}
        <div className="flex flex-col justify-between gap-4">
          <div
            className="rounded-[var(--radius-sm)] border border-[var(--color-gilt-shadow)] p-3"
            style={{ background: "rgba(220,177,58,0.06)" }}
          >
            <p className="meta-label" style={{ color: "var(--color-gilt-shadow)" }}>status</p>
            <p
              className="mt-1.5 text-[var(--color-gilt-lit)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "0.86rem",
                fontVariantCaps: "all-small-caps",
                letterSpacing: "0.16em",
                textTransform: "lowercase",
              }}
            >
              {labelForStatus(conference.conferenceStatus)}
            </p>
          </div>
          <Link
            href={`/conferences/${conference.slug}`}
            className="action-altar candle-flicker"
          >
            see the weekend
          </Link>
        </div>
      </div>

      {/* Predella — linden shelf with meta */}
      <div
        className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[var(--radius-sm)] px-4 py-3 text-[0.8rem]"
        style={{
          background: "linear-gradient(180deg, var(--color-linden), var(--color-linden-deep))",
          border: "1px solid var(--color-linden-deep)",
          color: "var(--color-ivory)",
          fontFamily: "var(--font-serif)",
          fontVariantCaps: "all-small-caps",
          letterSpacing: "0.16em",
          textTransform: "lowercase",
        }}
      >
        {location ? (
          <span className="inline-flex items-center gap-2">
            <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
            {location}
          </span>
        ) : null}
        {conference.organizer ? (
          <span className="inline-flex items-center gap-2">
            <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
            {conference.organizer}
          </span>
        ) : null}
        {conference.sourceFile ? (
          <span className="ml-auto inline-flex items-center gap-2 text-[0.72rem] text-[rgba(241,233,214,0.62)]">
            source · {conference.sourceFile.split("/").pop()?.replace(/\.[^.]+$/, "")}
          </span>
        ) : null}
      </div>
    </article>
  )
}

function labelForStatus(s: Conference["conferenceStatus"]): string {
  switch (s) {
    case "registration-open": return "registration open"
    case "sold-out": return "sold out"
    case "in-progress": return "in progress"
    case "completed": return "completed"
    case "cancelled": return "cancelled"
    case "upcoming":
    default:
      return "upcoming"
  }
}
