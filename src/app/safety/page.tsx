import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Safety · The Pause",
  description:
    "How HUBY/AA handles privacy, anonymity, and the Traditions when publishing meeting data.",
}

export default function SafetyPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · VII</span>
          <span className="sep" />
          <span>THE PAUSE</span>
        </div>
        <h1 className="section__title">
          Anonymity, <em>held.</em>
        </h1>
        <p className="section__lede">
          AA works because it&rsquo;s anonymous. A map-first directory is a
          dangerous thing if it forgets that. Here&rsquo;s what we do, and
          what we don&rsquo;t.
        </p>
      </section>

      <section
        className="section prose-with-aside"
        style={{ paddingTop: 0 }}
      >
        <div className="section__body">
          <p>
            <em>We don&rsquo;t publish member names.</em> We don&rsquo;t
            publish attendance. We don&rsquo;t publish anything that ties a
            person to a meeting. If you see your name on the sky,
            it&rsquo;s because you&rsquo;re listed as a host or organizer
            on a public conference page, and we&rsquo;ll remove it the
            moment you ask.
          </p>
          <p>
            <em>We hold Tradition 11 carefully.</em> No promotion, no
            personalities, no commercial links. Every registration button
            points to the host&rsquo;s own site. We don&rsquo;t collect
            clicks, we don&rsquo;t insert ads, we don&rsquo;t partner with
            outside enterprises.
          </p>
          <p>
            <em>We don&rsquo;t track you.</em> No analytics that identify
            individuals. No cookies beyond what Next.js sets for
            preferences. The only thing we log is which pages are busy, so
            we know what to keep fast.
          </p>
          <p>
            If something on this site harms your anonymity, write to us.
            We&rsquo;ll take it down, we&rsquo;ll write back, and
            we&rsquo;ll thank you for the help.
          </p>
        </div>

        <aside>
          <div
            style={{
              padding: "28px 32px",
              border: "1px solid rgba(223,78,50,0.38)",
              background: "rgba(223,78,50,0.05)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--coral)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              ▸ IF YOU&rsquo;RE IN TROUBLE
            </div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 22,
                color: "var(--parchment)",
                lineHeight: 1.25,
                marginBottom: 14,
              }}
            >
              Call a meeting, not a hotline.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--parchment)",
                opacity: 0.85,
                lineHeight: 1.55,
              }}
            >
              If you&rsquo;re in crisis, the fastest path is often a
              live young people&rsquo;s meeting on Zoom. Find one now —
              the coral stars on the sky are starting soon.
            </p>
            <Link
              href="/meetings"
              className="btn btn--primary"
              style={{ marginTop: 20, width: "100%", justifyContent: "center" }}
            >
              FIND A MEETING NOW
            </Link>
          </div>
        </aside>
      </section>

      <div style={{ height: 120 }} />
    </>
  )
}