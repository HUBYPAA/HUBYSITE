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
    <section
      className="section"
      style={{ paddingTop: 160, paddingBottom: 120, textAlign: "center", maxWidth: 720 }}
    >
      <div className="section__eyebrow" style={{ justifyContent: "center" }}>
        <span className="sep" />
        <span>UNEXPECTED · STAR IN FAULT</span>
        <span className="sep" />
      </div>
      <h1 className="section__title" style={{ textAlign: "center" }}>
        Something <em>broke.</em>
      </h1>
      <p className="section__lede" style={{ margin: "24px auto 0" }}>
        Try the page again. If the problem keeps happening, send the
        broken path through the submission flow so it can be reproduced.
      </p>
      <div
        style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
      >
        <button type="button" onClick={reset} className="btn btn--primary">
          TRY AGAIN
        </button>
        <Link href="/" className="btn btn--ghost">THE VAULT</Link>
        <Link href="/submit" className="btn btn--ghost">REPORT IT</Link>
      </div>
    </section>
  )
}