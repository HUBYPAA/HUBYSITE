import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Submit · Inscribe a new star",
  description:
    "Add a young people's AA meeting or conference to the catalog. Four steps: declare, locate, describe, commit.",
}

const STEPS = [
  { roman: "I", name: "Declare the record", body: "What kind of star are you placing — a meeting or a weekend? Young people's AA or another AA catalog entry." },
  { roman: "II", name: "Locate the star", body: "Address, city, and timezone. We place the marker on the sky and hold the coordinates exact." },
  { roman: "III", name: "Describe the light", body: "Day, time, format, meeting type, and contact. Enough detail that a newcomer at the door will recognize it." },
  { roman: "IV", name: "Sign the ledger", body: "A contact we can reach, so we can verify once and come back if the meeting moves. We never publish your name." },
]

export default function SubmitPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · V</span>
          <span className="sep" />
          <span>THE LEDGER</span>
        </div>
        <h1 className="section__title">
          Inscribe a <em>new star.</em>
        </h1>
        <p className="section__lede">
          Send the fix while it&rsquo;s fresh. No account. No public
          profile. Just the fix. Four short steps &mdash; roughly three
          minutes. We review each submission by hand, and we write back
          when we publish.
        </p>
      </section>

      <section
        className="section submit-grid"
        style={{ paddingTop: 0, paddingBottom: 120 }}
      >
        {/* LEFT · the form */}
        <form
          className="ledger-form"
          action="https://formspree.io/f/your-form-id"
          method="POST"
        >
          {STEPS.map((s, i) => (
            <div
              key={s.roman}
              className="ledger-step"
              style={{
                paddingTop: i === 0 ? 0 : 36,
                paddingBottom: 24,
                borderBottom:
                  i < STEPS.length - 1
                    ? "1px solid rgba(214,162,78,0.18)"
                    : "none",
              }}
            >
              <div className="ledger-step__head">
                <span className="ledger-step__roman">
                  {s.roman}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 22,
                      fontWeight: 400,
                      color: "var(--parchment)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--parchment)",
                      opacity: 0.72,
                      marginTop: 4,
                      lineHeight: 1.55,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>

              {i === 0 ? (
                <div className="ledger-step__fields">
                  <label className="field">
                    <span className="field__label">RECORD TYPE</span>
                    <select className="field__select" name="recordType" required>
                      <option value="meeting">Meeting</option>
                      <option value="conference">Conference</option>
                      <option value="event">Event</option>
                    </select>
                  </label>
                  <label className="field">
                    <span className="field__label">CATALOG</span>
                    <select className="field__select" name="catalog">
                      <option value="ypaa">Young people&rsquo;s AA</option>
                      <option value="aa">General AA</option>
                    </select>
                  </label>
                </div>
              ) : null}

              {i === 1 ? (
                <div className="ledger-step__fields">
                  <label className="field">
                    <span className="field__label">NAME</span>
                    <input className="field__input" name="title" required placeholder="e.g. Keep Coming Back" />
                  </label>
                  <label className="field">
                    <span className="field__label">ADDRESS</span>
                    <input className="field__input" name="address" placeholder="Street, city, state" />
                  </label>
                  <div className="two-by-two-tight">
                    <label className="field">
                      <span className="field__label">CITY</span>
                      <input className="field__input" name="city" required />
                    </label>
                    <label className="field">
                      <span className="field__label">STATE / REGION</span>
                      <input className="field__input" name="state" required />
                    </label>
                  </div>
                </div>
              ) : null}

              {i === 2 ? (
                <div className="ledger-step__fields">
                  <div className="two-by-two-tight">
                    <label className="field">
                      <span className="field__label">DAY</span>
                      <select className="field__select" name="day">
                        <option value="">—</option>
                        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span className="field__label">TIME</span>
                      <input className="field__input" name="time" placeholder="e.g. 19:30" />
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label">FORMAT</span>
                    <select className="field__select" name="format">
                      <option value="in-person">In person</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </label>
                  <label className="field">
                    <span className="field__label">TAGS</span>
                    <input className="field__input" name="tags" placeholder="open, speaker, big book, young…" />
                    <span className="field__hint">Comma-separated. These become the star&rsquo;s filter chips.</span>
                  </label>
                  <label className="field">
                    <span className="field__label">NOTES</span>
                    <textarea className="field__textarea" name="notes" placeholder="Anything a newcomer should know at the door." />
                  </label>
                </div>
              ) : null}

              {i === 3 ? (
                <div className="ledger-step__fields">
                  <label className="field">
                    <span className="field__label">YOUR NAME</span>
                    <input className="field__input" name="submitterName" required />
                    <span className="field__hint">We never publish this. It stays in the ledger.</span>
                  </label>
                  <label className="field">
                    <span className="field__label">YOUR EMAIL</span>
                    <input className="field__input" type="email" name="submitterEmail" required />
                  </label>
                  <label
                    className="field"
                    style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 24 }}
                  >
                    <input type="checkbox" name="affirm" required style={{ marginTop: 6 }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, opacity: 0.82, lineHeight: 1.55 }}>
                      I affirm this is a real meeting, that I&rsquo;ve attended or
                      confirmed it, and that I&rsquo;m submitting in the spirit
                      of Tradition 11 — no promotion, no personalities.
                    </span>
                  </label>
                </div>
              ) : null}
            </div>
          ))}

          <button
            type="submit"
            className="btn btn--primary"
            style={{ marginTop: 32, width: "100%", justifyContent: "center" }}
          >
            ✦ SIGN & INSCRIBE
          </button>
        </form>

        {/* RIGHT · live preview panel */}
        <aside>
          <div className="ledger-preview">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>LIVE PREVIEW</span>
              <span style={{ color: "var(--gold-aged)" }}>/00</span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 28,
                marginTop: 10,
                color: "var(--parchment)",
                lineHeight: 1.1,
              }}
            >
              A new star,
              <br />
              unlit.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                marginTop: 10,
                opacity: 0.78,
                lineHeight: 1.55,
              }}
            >
              As you fill the form, this card will show you the star
              we&rsquo;re about to inscribe. Once we verify, it goes live on
              the sky.
            </p>

            {/* tiny mini-plate */}
            <div
              style={{
                position: "relative",
                height: 180,
                marginTop: 20,
                border: "1px solid rgba(214,162,78,0.28)",
                background:
                  "radial-gradient(ellipse at center, rgba(45,62,156,0.6), rgba(17,27,74,0.9))",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 80,
                  height: 80,
                  border: "1px dashed rgba(214,162,78,0.45)",
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 12px 2px rgba(214,162,78,0.5)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  color: "var(--gold-aged)",
                }}
              >
                NEW · UNLIT
              </span>
            </div>

            <div
              style={{
                marginTop: 20,
                paddingTop: 14,
                borderTop: "1px solid rgba(214,162,78,0.22)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                color: "var(--parchment)",
                opacity: 0.7,
                lineHeight: 1.6,
              }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}
              >
                <span>TRADITIONS</span>
                <b style={{ color: "var(--gold)", fontWeight: 400 }}>T1·T6·T11</b>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}
              >
                <span>VERIFY BY</span>
                <b style={{ color: "var(--gold)", fontWeight: 400 }}>HUMAN</b>
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}
              >
                <span>TURNAROUND</span>
                <b style={{ color: "var(--gold)", fontWeight: 400 }}>~48H</b>
              </div>
            </div>
          </div>

          {/* The best submissions */}
          <div className="ledger-note">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              THE BEST SUBMISSIONS
            </div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 15,
                lineHeight: 1.5,
                color: "var(--parchment)",
                opacity: 0.9,
                margin: 0,
              }}
            >
              Specific, sourced, and fast. A rough note sent while the
              details are fresh beats a polished correction sent two
              weeks later.
            </p>
          </div>

          {/* What helps most */}
          <div className="ledger-note ledger-note--tight">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--gold)",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              WHAT HELPS MOST
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontFamily: "var(--font-sans)",
                fontSize: 13.5,
                lineHeight: 1.6,
                color: "var(--parchment)",
                opacity: 0.85,
              }}
            >
              <li>&middot;&nbsp; A source link we can verify.</li>
              <li>&middot;&nbsp; A city and state, even if the rest is incomplete.</li>
              <li>&middot;&nbsp; Specific fixes instead of &ldquo;this looks wrong.&rdquo;</li>
              <li>&middot;&nbsp; Whether the record is confirmed, tentative, or outdated.</li>
            </ul>
          </div>

          {/* Do-not-send / Traditions note */}
          <div
            style={{
              marginTop: 16,
              padding: "18px 20px",
              border: "1px solid rgba(223,78,50,0.35)",
              background: "rgba(223,78,50,0.06)",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "var(--parchment)",
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--coral)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              &#9656; DO-NOT-SEND
            </div>
            Personal names, attendance details, private stories, or
            anything that would cut against anonymity. This intake is
            for listings and context &mdash; not people. If it crosses
            a Tradition, we quietly bounce it and let you know why.
          </div>

          <Link
            href="/about"
            style={{
              display: "block",
              marginTop: 16,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--gold-aged)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            Read the full submission guide →
          </Link>
        </aside>
      </section>
    </>
  )
}
