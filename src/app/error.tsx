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
      <div className="panel-vault rise-in max-w-xl p-8 text-center md:p-10">
        <p className="meta-label">Unexpected error</p>
        <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-[rgba(240,235,228,0.95)]">
          Something broke harder than it should have.
        </h1>
        <p className="mt-5 text-sm leading-7 text-[rgba(210,203,194,0.68)]">
          Try the page again. If the problem keeps happening, use the submission
          flow to report what you were doing so it can be reproduced cleanly.
        </p>
        <div className="panel-outline mt-6 p-4 text-left sm:p-5">
          <p className="meta-label">Fastest recovery path</p>
          <p className="mt-2 text-sm leading-7 text-muted">
            Retry the page first. If it repeats, go home or send the broken path
            through the update form.
          </p>
        </div>
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
