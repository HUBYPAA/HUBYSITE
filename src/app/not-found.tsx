import Link from "next/link"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-[78vh] items-center justify-center px-4 py-24"
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, rgba(74,31,106,0.55), transparent 60%), linear-gradient(180deg, var(--color-lapis-deep), #050818 100%)",
      }}
    >
      {/* A few rare violet stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {[12, 28, 42, 58, 71, 84].map((x, i) => (
          <span
            key={i}
            className={`star star--lit ${i % 2 === 0 ? "star--twinkle" : ""}`}
            style={{
              left: `${x}%`,
              top: `${10 + ((i * 13) % 60)}%`,
              width: `${4 + (i % 3)}px`,
              height: `${4 + (i % 3)}px`,
              ["--twinkle-delay" as string]: `${i * 0.4}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="rise-in relative max-w-xl text-center">
        {/* The lone gilt star, slightly tilted */}
        <div className="flex justify-center" style={{ transform: "rotate(-8deg)" }}>
          <HeraldicGlyph name="star-eight" className="h-20 w-20 text-[var(--color-gilt)] candle-flicker" />
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
          ✦ four · zero · four ✦
        </p>

        <h1
          className="mt-5 text-[var(--color-ivory)]"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.4rem,6vw,4rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            textWrap: "balance",
          }}
        >
          this passage is closed.
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
          The link may be stale, the route may have moved, or the record may
          not exist yet. Try the doors that stay open most often.
        </p>

        <div className="mt-8" style={{ color: "rgba(241,233,214,0.4)" }}>
          <FiligreeRule tone="ivory" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="action-altar">
            return to the nave
          </Link>
          <Link
            href="/meetings"
            className="action-secondary"
            style={{
              background: "rgba(241,233,214,0.06)",
              color: "var(--color-ivory)",
              borderColor: "rgba(220,177,58,0.32)",
            }}
          >
            meetings
          </Link>
          <Link
            href="/conferences"
            className="action-secondary"
            style={{
              background: "rgba(241,233,214,0.06)",
              color: "var(--color-ivory)",
              borderColor: "rgba(220,177,58,0.32)",
            }}
          >
            conferences
          </Link>
        </div>
      </div>
    </div>
  )
}
