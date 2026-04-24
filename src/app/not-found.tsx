import Link from "next/link"

export default function NotFound() {
  return (
    <section className="star-moment">
      <span className="starmark starmark--hero" aria-hidden />
      <h1 className="star-moment__title">
        Not in this <em>sky.</em>
      </h1>
      <p className="star-moment__lede">
        The link may be stale, the route may have moved, or the record
        may not exist yet.
      </p>
      <div className="star-moment__actions">
        <Link href="/" className="btn btn--gold">Home</Link>
        <Link href="/meetings" className="btn btn--ghost">Meetings</Link>
        <Link href="/conferences" className="btn btn--ghost">Conferences</Link>
      </div>
    </section>
  )
}
