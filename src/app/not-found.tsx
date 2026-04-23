import Link from "next/link"

export default function NotFound() {
  return (
    <section
      className="section"
      style={{
        paddingTop: 160,
        paddingBottom: 120,
        textAlign: "center",
        maxWidth: 720,
      }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 48,
          color: "var(--gold)",
          opacity: 0.6,
        }}
      >
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
      <p className="section__lede" style={{ margin: "24px auto 0" }}>
        The link may be stale, the route may have moved, or the record may
        not exist yet. Try the doors that stay open most often.
      </p>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" className="btn btn--primary">THE VAULT</Link>
        <Link href="/meetings" className="btn btn--ghost">MEETINGS</Link>
        <Link href="/conferences" className="btn btn--ghost">CONFERENCES</Link>
      </div>
    </section>
  )
}