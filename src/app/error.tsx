"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <section className="section fault-shell">
      <div className="fault-card">
        <span className="fault-card__mark" aria-hidden>✦</span>
        <div className="section__eyebrow" style={{ justifyContent: "center" }}>
          <span className="sep" />
          <span>Unexpected error</span>
          <span className="sep" />
        </div>
        <h1 className="section__title" style={{ textAlign: "center" }}>
          Something broke <em>harder than it should have.</em>
        </h1>
        <p className="section__lede fault-card__lede">
          Try the page again. If the problem keeps happening, use the submission
          flow to report what you were doing so it can be reproduced cleanly.
        </p>
        <div className="fault-card__actions">
          <button type="button" onClick={reset} className="btn btn--primary">
            Try again
          </button>
          <Link href="/" className="btn btn--ghost">Home</Link>
          <Link href="/submit" className="btn btn--ghost">Report issue</Link>
        </div>
      </div>
    </section>
  )
}
