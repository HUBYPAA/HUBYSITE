import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Conference } from "@/lib/data/normalized/types"
import { formatDateRange } from "@/lib/utils/dates"

interface FeaturedAltarProps {
  conference: Conference
  variant?: "compact" | "full"
}

/**
 * Featured conference card — the altar.
 * The one cinematic navy/cobalt-glowing surface on the page.
 */
export function FeaturedAltar({ conference, variant = "compact" }: FeaturedAltarProps) {
  const dateRange = formatDateRange(conference.startDate, conference.endDate)
  const location = [conference.venue, conference.city, conference.stateAbbreviation]
    .filter(Boolean)
    .join(", ")

  return (
    <article className={`altar ${variant === "full" ? "altar--full" : ""}`}>
      <p className="altar__label">Featured weekend</p>

      <Link href={`/conferences/${conference.slug}`} className="inline-block">
        <h2 className="altar__title">{conference.title}</h2>
      </Link>

      {conference.summary ? (
        <p className="altar__summary">{conference.summary}</p>
      ) : (
        <p className="altar__summary">
          A weekend, a host city, the people you already love and a whole lot you&rsquo;re about to.
        </p>
      )}

      <div className="altar__meta">
        <div>
          <p className="altar__meta-label">When</p>
          <p className="altar__meta-value">{dateRange || "Dates pending"}</p>
        </div>
        {location ? (
          <div>
            <p className="altar__meta-label">Where</p>
            <p className="altar__meta-value">{location}</p>
          </div>
        ) : null}
        <div>
          <p className="altar__meta-label">Status</p>
          <p className="altar__meta-value">{labelForStatus(conference.conferenceStatus)}</p>
        </div>
      </div>

      <Link href={`/conferences/${conference.slug}`} className="altar__cta">
        See the weekend
        <ArrowRight className="h-4 w-4" />
      </Link>
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
