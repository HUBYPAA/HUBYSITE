import Link from "next/link"

export function SiteFooter({
  meetingCount,
  conferenceCount,
  stateCount,
}: {
  meetingCount: number
  conferenceCount: number
  stateCount: number
}) {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__lead">
          <p className="site-footer__kicker">Painted heaven, made useful.</p>
          <h2 className="site-footer__title">
            Rooms, weekends, service paths, and regional memory in one living atlas.
          </h2>
          <p className="site-footer__text">
            HUBYPAA helps people find meetings, conferences, events, and trusted
            regional information without turning the interface into theater.
          </p>
        </div>

        <div className="site-footer__stats" aria-label="Site coverage">
          <div>
            <span>Meetings</span>
            <strong>{meetingCount.toLocaleString()}</strong>
          </div>
          <div>
            <span>Conferences</span>
            <strong>{conferenceCount.toLocaleString()}</strong>
          </div>
          <div>
            <span>States</span>
            <strong>{stateCount}</strong>
          </div>
        </div>

        <div className="site-footer__actions">
          <Link href="/submit" className="btn btn--primary">
            Submit an update
          </Link>
          <Link href="/safety" className="btn btn--ghost">
            Safety
          </Link>
        </div>
      </div>
    </footer>
  )
}
