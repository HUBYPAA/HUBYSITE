import Link from "next/link"
import type { Conference } from "@/lib/data/normalized/types"
import { formatDateRange } from "@/lib/utils/dates"

interface FeaturedAltarProps {
  conference: Conference
  variant?: "compact" | "full"
}

/**
 * Featured conference card, VAULT treatment.
 * Panel with gold corner brackets, serif title, mono meta rows.
 */
export function FeaturedAltar({ conference }: FeaturedAltarProps) {
  const dateRange = formatDateRange(conference.startDate, conference.endDate)
  const location = [conference.venue, conference.city, conference.stateAbbreviation]
    .filter(Boolean)
    .join(", ")

  return (
    <article
      className="detail"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      <div className="detail__idx">
        <span>FEATURED CONSTELLATION</span>
        <span>/01</span>
      </div>
      <Link
        href={`/conferences/${conference.slug}`}
        style={{ textDecoration: "none" }}
      >
        <h2 className="detail__name">
          <em>{conference.title}</em>
        </h2>
      </Link>
      {conference.summary ? (
        <p className="detail__addr">{conference.summary}</p>
      ) : null}
      <div className="detail__rows">
        <div className="r">
          <span>DATES</span>
          <b>{dateRange || "TBA"}</b>
        </div>
        {location ? (
          <div className="r">
            <span>WHERE</span>
            <b>{location}</b>
          </div>
        ) : null}
        <div className="r">
          <span>STATUS</span>
          <b>{labelForStatus(conference.conferenceStatus)}</b>
        </div>
      </div>
      <div className="detail__cta">
        <Link href={`/conferences/${conference.slug}`} className="primary">
          See the weekend
        </Link>
      </div>
    </article>
  )
}

function labelForStatus(s: Conference["conferenceStatus"]): string {
  switch (s) {
    case "registration-open": return "Registration open"
    case "sold-out":          return "Sold out"
    case "in-progress":       return "In progress"
    case "completed":         return "Completed"
    case "cancelled":         return "Cancelled"
    case "upcoming":
    default:                  return "Upcoming"
  }
}