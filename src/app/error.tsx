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
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="site-shell flex min-h-[70vh] items-center justify-center py-24">
      <div className="panel-raised max-w-xl p-8 text-center md:p-10">
        <p className="meta-label">Unexpected error</p>
        <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-ink">
          Something broke harder than it should have.
        </h1>
        <p className="mt-5 text-sm leading-7 text-muted">
          Try the page again. If the problem keeps happening, use the submission
          flow to report what you were doing so it can be reproduced cleanly.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="action-primary">
            Try again
          </button>
          <Link href="/" className="action-secondary">
            Home
          </Link>
          <Link href="/submit" className="action-secondary">
            Report issue
          </Link>
        </div>
      </div>
    </div>
  )
}
