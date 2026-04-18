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
    <div className="shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Unexpected</p>
        <h1 className="display-1 mt-4">Something broke.</h1>
        <p className="body-lg mt-5">
          Try the page again. If the problem keeps happening, send the broken
          path through the submission flow so it can be reproduced.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary btn-lg">
            Try again
          </button>
          <Link href="/" className="btn btn-secondary btn-lg">Home</Link>
          <Link href="/submit" className="btn btn-ghost btn-lg">Report it</Link>
        </div>
      </div>
    </div>
  )
}
