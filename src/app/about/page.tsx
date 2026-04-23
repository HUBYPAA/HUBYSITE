import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About · The Keeper",
  description:
    "Who keeps the HUBYPAA catalog, how a star gets inscribed, and what we publish (and don't).",
}

export default function AboutPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · VI</span>
          <span className="sep" />
          <span>THE KEEPER</span>
        </div>
        <h1 className="section__title">
          A catalog, kept <em>by hand.</em>
        </h1>
        <p className="section__lede">
          The information is real. The path to it is usually messy. This is
          the cleaner front door &mdash; a hand-verified directory of young
          people&rsquo;s AA meetings and conferences. We think a star
          should only go on the sky if someone walked to the door.
        </p>
      </section>

      <section
        className="section two-col-prose"
        style={{ paddingTop: 0 }}
      >
        <div className="section__body">
          <p>
            Every entry starts as a submission. A helper reads it. If the
            meeting checks out — the door exists, the room exists, the
            time matches — we place the star. If it doesn&rsquo;t, we
            quietly bounce it back with a note. We don&rsquo;t publish
            ghosts.
          </p>
          <p>
            We update coordinates when a meeting moves. We dim the star
            when a meeting dies. We never delete the record, because
            somebody googling a group they once loved deserves to see that
            it was real, and that it&rsquo;s over.
          </p>
          <p>
            What we don&rsquo;t do: we don&rsquo;t publish <em>member
              names</em>, attendance, endorsements, commercial links, or
            anything that crosses a Tradition. We don&rsquo;t rank
            meetings. We don&rsquo;t feature personalities. The catalog is
            about places and hours, not people.
          </p>
          <p>
            The site is free. It costs us nothing to run but time, and
            time we have.
          </p>
        </div>

        <aside>
          <div
            style={{
              padding: "28px 32px",
              border: "1px solid rgba(214,162,78,0.32)",
              background: "rgba(11,10,8,0.5)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              PRINCIPLES · ROMAN ORDER
            </div>
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                counterReset: "princ 0",
              }}
            >
              {[
                ["I", "A star is placed, not claimed."],
                ["II", "A meeting is a door, not a brand."],
                ["III", "We verify by hand. We publish by hand."],
                ["IV", "We keep dead stars on the record, dimmed."],
                ["V", "We hold Tradition 11 like it&rsquo;s glass."],
                ["VI", "Free for always. Supported by young AAs."],
              ].map(([roman, body]) => (
                <li
                  key={roman}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(214,162,78,0.12)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: 20,
                      color: "var(--gold)",
                      fontWeight: 300,
                    }}
                  >
                    {roman}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      color: "var(--parchment)",
                      opacity: 0.92,
                      lineHeight: 1.5,
                    }}
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>

      {/* What this site is NOT — four boundaries */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · VI · ii</span>
          <span className="sep" />
          <span>BOUNDARIES</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--parchment)",
            marginTop: 16,
            marginBottom: 40,
          }}
        >
          What this site <em style={{ color: "var(--gold)" }}>is not.</em>
        </h2>

        <div className="two-col-prose" style={{ gap: 32 }}>
          {[
            "Not an official AA body. The directory follows the spirit of the Traditions but does not speak for AA as a whole.",
            "Not a social feed. No public profiles, no like counts, no algorithmic timeline.",
            "Not a place for personal names, attendance data, or member tracking. Anonymity is structural here, not decorative.",
            "Not a claim that every record is already perfect. Some entries are scaffolds and say so.",
          ].map((t) => (
            <div
              key={t}
              style={{
                padding: "22px 26px",
                border: "1px solid rgba(214,162,78,0.2)",
                background: "rgba(11,10,8,0.4)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "var(--coral)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                NOT
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--parchment)",
                  opacity: 0.92,
                  margin: 0,
                }}
              >
                {t}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing — keep it better */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>KEEP IT BETTER</span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: "clamp(32px, 4.4vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--parchment)",
            marginTop: 16,
            maxWidth: 820,
          }}
        >
          The catalog stays useful only if{" "}
          <em style={{ color: "var(--gold)" }}>
            corrections move faster than drift.
          </em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--parchment)",
            opacity: 0.85,
            maxWidth: 720,
            marginTop: 20,
          }}
        >
          Good information is a form of care. Broken link, meeting that
          moved, wrong dates &mdash; if you see it, send it. The site gets
          stronger because the network uses it, not because the copy
          sounds confident.
        </p>
      </section>

      <section className="section" style={{ paddingTop: 20, paddingBottom: 120 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/submit" className="btn btn--primary">
            ✦ INSCRIBE A STAR
          </Link>
          <Link href="/safety" className="btn btn--ghost">
            HOW WE KEEP THIS SAFE →
          </Link>
          <Link href="/what-is-ypaa" className="btn btn--ghost">
            WHAT YPAA MEANS →
          </Link>
        </div>
      </section>
    </>
  )
}