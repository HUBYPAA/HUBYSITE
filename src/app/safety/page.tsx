import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Safety & Anonymity · HUBYPAA",
  description:
    "Safety notes, anonymity reminders, and crisis resources for anyone using the site or moving through YPAA spaces.",
}

const HOTLINES = [
  {
    name: "SAMHSA National Helpline",
    detail: "1-800-662-4357 · confidential, 24/7",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Call or text 988",
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741",
  },
  {
    name: "AA General Service Office",
    detail: "212-870-3400",
  },
]

export default function SafetyPage() {
  return (
    <section className="shell" aria-labelledby="safety-title">
      <header
        style={{
          maxWidth: "60ch",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-8)",
        }}
      >
        <span
          className="starmark starmark--xl"
          aria-hidden
          style={{ display: "inline-block", marginBottom: "var(--space-5)" }}
        />
        <h1 id="safety-title" className="display-page">
          Anonymity is not decorative copy.{" "}
          <em>Safety is not an afterthought.</em>
        </h1>
        <p
          className="lede"
          style={{ marginTop: "var(--space-4)", marginInline: "auto" }}
        >
          If the site is going to help people move through meetings and
          conferences, it should also make the basic guardrails easy to find.
        </p>
      </header>

      {/* Crisis hotlines — high-visibility frames */}
      <section
        className="section"
        style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontFeatureSettings: 'var(--ff-label)',
            fontSize: "10.5px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--gilt)",
            textAlign: "center",
            margin: "0 0 var(--space-5)",
          }}
        >
          Need help now
        </p>
        <div
          style={{
            display: "grid",
            gap: "var(--space-3)",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            maxWidth: "840px",
            margin: "0 auto",
          }}
        >
          {HOTLINES.map((item) => (
            <div
              key={item.name}
              className="frame"
              style={{ padding: "var(--space-5) var(--space-6)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 500,
                  fontSize: "var(--text-md)",
                  color: "var(--parchment)",
                  margin: 0,
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  marginTop: "var(--space-2)",
                  fontFamily: "var(--font-mono)",
                  fontVariantNumeric: "tabular-nums lining-nums",
                  fontSize: "var(--text-sm)",
                  letterSpacing: "0.08em",
                  color: "var(--gilt)",
                  margin: 0,
                }}
              >
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="quiet-prose">
        <h2>Anonymity.</h2>
        <p>
          What people share in meetings is not material for screenshots,
          group chats, or casual retelling. The site follows the same
          restraint by avoiding personal names, attendance data, and
          public member profiles.
        </p>
        <p>
          Online spaces deserve the same caution. Do not record meetings.
          Do not share private Zoom details more broadly than intended.
          Do not assume a digital room changes the standard.
        </p>
        <p>
          At conferences, safety is practical: pay attention to the
          culture of the room, look for safety teams or host contacts,
          and tell someone trustworthy if a situation feels wrong.
        </p>

        <h2>Before you post.</h2>
        <p>
          Ask whether what you&rsquo;re sharing exposes someone else, even
          indirectly.
        </p>

        <h2>Before you travel.</h2>
        <p>
          Verify event details from the source link, especially if a
          conference record still carries a scaffold note.
        </p>

        <h2>Before you assume.</h2>
        <p>
          A younger room can still need boundaries, sponsorship, and the
          same care any AA space needs.
        </p>
      </div>
    </section>
  )
}
