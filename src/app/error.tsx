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
    <section className="star-moment">
      <span className="starmark starmark--hero" aria-hidden />
      <h1 className="star-moment__title">
        Something broke <em>harder than it should have.</em>
      </h1>
      <p className="star-moment__lede">
        Try the page again. If it keeps happening, use the submission
        flow to report what you were doing.
      </p>
      <div className="star-moment__actions">
        <button type="button" onClick={reset} className="btn btn--gold">
          Try again
        </button>
        <Link href="/" className="btn btn--ghost">Home</Link>
        <Link href="/submit" className="btn btn--ghost">Report issue</Link>
      </div>
    </section>
  )
}
