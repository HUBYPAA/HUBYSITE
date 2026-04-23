import Link from "next/link"

export default function NotFound() {
  return (
    <section className="section fault-shell">
      <div className="fault-card">
        <span className="fault-card__mark" aria-hidden>
          ✦
        </span>
        <div
          className="section__eyebrow"
          style={{ justifyContent: "center", marginTop: 16 }}
        >
          <span className="sep" />
          <span>404 · STAR UNCHARTED</span>
          <span className="sep" />
        </div>
        <h1 className="section__title" style={{ textAlign: "center" }}>
          This <em>plate</em>
          <br />
          isn&rsquo;t in the vault.
        </h1>
        <p className="section__lede fault-card__lede">
          The link may be stale, the route may have moved, or the record may
          not exist yet. Try the doors that stay open most often.
        </p>
        <div className="fault-card__actions">
          <Link href="/" className="btn btn--primary">THE VAULT</Link>
          <Link href="/meetings" className="btn btn--ghost">MEETINGS</Link>
          <Link href="/conferences" className="btn btn--ghost">CONFERENCES</Link>
        </div>
      </div>
    </section>
  )
}
