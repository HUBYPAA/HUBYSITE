"use client"

import { useEffect } from "react"
import Link from "next/link"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"

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
    <div
      className="relative flex min-h-[78vh] items-center justify-center px-4 py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(122,26,42,0.55), transparent 60%), linear-gradient(180deg, var(--color-lapis-deep), #050818 100%)",
      }}
    >
      <div className="rise-in relative max-w-xl text-center">
        <div className="flex justify-center" style={{ transform: "rotate(6deg)" }}>
          <HeraldicGlyph name="winged-shield" className="h-20 w-20 text-[var(--color-gilt)] candle-flicker" />
        </div>

        <p
          className="mt-8 text-[var(--color-gilt-shadow)]"
          style={{
            fontFamily: "var(--font-serif)",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.32em",
            fontSize: "0.84rem",
          }}
        >
          ✦ unexpected ✦
        </p>

        <h1
          className="mt-5 text-[var(--color-ivory)]"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.2rem,5vw,3.5rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            textWrap: "balance",
          }}
        >
          something broke harder than it should have.
        </h1>

        <p
          className="mx-auto mt-6 max-w-md text-[rgba(241,233,214,0.65)]"
          style={{
            fontFamily: "var(--font-prose)",
            fontStyle: "italic",
            fontSize: "1rem",
            lineHeight: 1.78,
          }}
        >
          Try the page again. If the problem keeps happening, send the broken
          path through the submission flow so it can be reproduced.
        </p>

        <div className="mt-8" style={{ color: "rgba(241,233,214,0.4)" }}>
          <FiligreeRule tone="ivory" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="action-altar">
            try again
          </button>
          <Link
            href="/"
            className="action-secondary"
            style={{
              background: "rgba(241,233,214,0.06)",
              color: "var(--color-ivory)",
              borderColor: "rgba(220,177,58,0.32)",
            }}
          >
            home
          </Link>
          <Link
            href="/submit"
            className="action-secondary"
            style={{
              background: "rgba(241,233,214,0.06)",
              color: "var(--color-ivory)",
              borderColor: "rgba(220,177,58,0.32)",
            }}
          >
            report it
          </Link>
        </div>
      </div>
    </div>
  )
}
