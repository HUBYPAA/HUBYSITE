import Link from "next/link"
import type { Conference } from "@/lib/data/normalized/types"
import { formatDateRange } from "@/lib/utils/dates"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"

interface FeaturedAltarProps {
  conference: Conference
  /** "compact" for the home page, "full" for conference detail */
  variant?: "compact" | "full"
}

/**
 * The Veit Stoss altarpiece, as a card.
 *
 * One altar per site. Deep lapis ground (reads against the vault sky,
 * not competing with it), linden predella, gilt title. Pentaptych
 * structure: left wing (date), central panel (title + summary),
 * right wing (status + CTA), predella (meta).
 */
export function FeaturedAltar({ conference, variant = "compact" }: FeaturedAltarProps) {
  const dateRange = formatDateRange(conference.startDate, conference.endDate)
  const location = [conference.venue, conference.city, conference.stateAbbreviation]
    .filter(Boolean)
    .join(" · ")

  return (
    <article className={`altar ${variant === "full" ? "altar--full" : "altar--compact"}`}>
      <div className="altar__kicker-row">
        <span className="altar__kicker">
          <HeraldicGlyph name="star-diamond" />
          this month&apos;s altar
        </span>
        {conference.notes?.toLowerCase().includes("scaffold") ? (
          <span className="altar__status-pill">still being wired</span>
        ) : null}
      </div>

      <div className={`altar__pentaptych ${variant === "full" ? "altar__pentaptych--full" : ""}`}>
        {/* LEFT WING — date */}
        <div className="altar__wing">
          <p className="altar__label">weekend</p>
          <p className="altar__date">{dateRange || "dates pending"}</p>
          {conference.city ? (
            <p className="altar__city">
              {conference.city}
              {conference.stateAbbreviation ? ` · ${conference.stateAbbreviation}` : ""}
            </p>
          ) : null}
        </div>

        {/* CENTRAL PANEL — title */}
        <div className="altar__center">
          <p className="altar__label">conference</p>
          <Link href={`/conferences/${conference.slug}`} className="altar__title-link">
            <h2 className={`altar__title ${variant === "full" ? "altar__title--full" : ""}`}>
              {conference.title}
            </h2>
          </Link>
          {conference.summary ? (
            <p className="altar__summary">{conference.summary}</p>
          ) : (
            <p className="altar__summary altar__summary--placeholder">
              A weekend, a host city, the people you already love and a whole
              lot you&rsquo;re about to.
            </p>
          )}
        </div>

        {/* RIGHT WING — action */}
        <div className="altar__right-wing">
          <div className="altar__status">
            <p className="altar__label">status</p>
            <p className="altar__status-value">{labelForStatus(conference.conferenceStatus)}</p>
          </div>
          <Link href={`/conferences/${conference.slug}`} className="altar__cta">
            see the weekend
          </Link>
        </div>
      </div>

      {/* PREDELLA — the linden wooden shelf */}
      <div className="altar__predella">
        {location ? (
          <span className="altar__predella-item">
            <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
            {location}
          </span>
        ) : null}
        {conference.organizer ? (
          <span className="altar__predella-item">
            <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
            {conference.organizer}
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
