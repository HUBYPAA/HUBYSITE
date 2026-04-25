"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ActionStrip, FocalPanel, PageShell } from "@/lib/components/atlas"

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
    <PageShell tone="stone">
      <div className="door-panel shell">
        <FocalPanel
          kicker="Unexpected error"
          title="Something broke harder than it should have."
          lead="Try the page again. If it keeps happening, use the submission flow to report what you were doing."
          actions={
            <ActionStrip>
              <button type="button" onClick={reset} className="btn btn--primary">
                Try again
              </button>
              <Link href="/" className="btn btn--ghost">
                Home
              </Link>
              <Link href="/submit" className="btn btn--ghost">
                Report issue
              </Link>
            </ActionStrip>
          }
        />
      </div>
    </PageShell>
  )
}
