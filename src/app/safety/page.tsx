import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Safety · The Pause",
  description:
    "How HUBYPAA handles privacy, anonymity, and the Traditions when publishing meeting data.",
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
          dangerous thing if it forgets that. Anonymity isn&rsquo;t
          decorative copy and safety isn&rsquo;t an afterthought &mdash;
          here&rsquo;s what we do, and what we don&rsquo;t.
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

      {/* Real-world resources — use them first */}
      <section className="section" style={{ paddingTop: 20, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · VII · ii</span>
          <span className="sep" />
          <span>NEED HELP RIGHT NOW</span>
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
            maxWidth: 780,
          }}
        >
          Use the <em style={{ color: "var(--gold)" }}>real-world support</em> first.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--parchment)",
            opacity: 0.82,
            maxWidth: 680,
            marginTop: 16,
            marginBottom: 32,
          }}
        >
          This page can orient you, but it is not the emergency response.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {[
            { name: "SAMHSA National Helpline", detail: "1-800-662-4357 · confidential · 24/7", href: "tel:18006624357" },
            { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988", href: "tel:988" },
            { name: "Crisis Text Line", detail: "Text HOME to 741741", href: "sms:741741" },
            { name: "AA General Service Office", detail: "212-870-3400", href: "tel:2128703400" },
          ].map((r) => (
            <a
              key={r.name}
              href={r.href}
              style={{
                display: "block",
                padding: "22px 24px",
                border: "1px solid rgba(214,162,78,0.28)",
                background: "rgba(11,10,8,0.42)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.22em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                CALL
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "var(--parchment)",
                  lineHeight: 1.2,
                }}
              >
                {r.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: "var(--gold-aged)",
                  marginTop: 8,
                }}
              >
                {r.detail}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Three small pauses */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="section__eyebrow">
          <span>PLATE · VII · iii</span>
          <span className="sep" />
          <span>BEFORE YOU</span>
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
            marginBottom: 40,
          }}
        >
          Three <em style={{ color: "var(--gold)" }}>small pauses.</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {[
            { n: "I", t: "Before you post.", b: "Ask whether what you're sharing exposes someone else, even indirectly. Screenshots are not for meetings." },
            { n: "II", t: "Before you travel.", b: "Verify event details from the host's own site, especially if a record still carries a scaffold note." },
            { n: "III", t: "Before you assume.", b: "A younger room can still need boundaries, sponsorship, and the same care any AA space needs." },
          ].map((p) => (
            <div
              key={p.n}
              style={{
                padding: "26px 28px",
                border: "1px solid rgba(214,162,78,0.2)",
                background: "rgba(11,10,8,0.4)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 28,
                  color: "var(--gold)",
                  marginBottom: 12,
                  lineHeight: 1,
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: 22,
                  color: "var(--parchment)",
                  marginBottom: 10,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.15,
                }}
              >
                {p.t}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "var(--parchment)",
                  opacity: 0.85,
                  margin: 0,
                }}
              >
                {p.b}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}