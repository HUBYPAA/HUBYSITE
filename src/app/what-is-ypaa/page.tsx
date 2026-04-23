import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "What is YPAA · The Glossary",
  description:
    "Young people's AA: what it is, how the conferences work, and the vocabulary of the weekends.",
}

export default function WhatIsYpaaPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 104, paddingBottom: 40 }}>
        <div className="section__eyebrow">
          <span>PLATE · VIII</span>
          <span className="sep" />
          <span>THE GLOSSARY</span>
        </div>
        <h1 className="section__title">
          A part of AA, <em>not a separate program.</em>
        </h1>
        <p className="section__lede">
          YPAA is the younger side of Alcoholics Anonymous &mdash; meetings,
          conferences, committees, and the friendships that make recovery
          feel closer to home. No separate set of steps, no different
          fellowship, no alternate AA. The shorthand most people use:{" "}
          <em>same program, particular room.</em>
        </p>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {[
            {
              term: "YPAA",
              def: "Young People in Alcoholics Anonymous. Not a separate fellowship — a wing of it.",
            },
            {
              term: "Conference",
              def: "A weekend, 3–4 days, hosted in a city by a committee of local young AAs. Meetings, a speaker, a dance.",
            },
            {
              term: "The Bid",
              def: "How host cities rotate. Each year&rsquo;s conference picks the next host by vote.",
            },
            {
              term: "Hospitality",
              def: "The suite where the conference doesn&rsquo;t end. Run by volunteers, open until dawn.",
            },
            {
              term: "The Marathon",
              def: "Saturday. Six to eight meetings stacked back-to-back. Pick your lane.",
            },
            {
              term: "Traditions",
              def: "The twelve rules that keep AA unified. Tradition 11 (no promotion, no personalities) is why this site looks the way it does.",
            },
            {
              term: "Scholarship",
              def: "Funded registrations. Every conference holds some back for young people who can&rsquo;t afford the full price.",
            },
            {
              term: "Panels",
              def: "The content track. A panel is 3–5 people on a topic — service, step work, sponsorship, coming back.",
            },
            {
              term: "Dance",
              def: "Saturday night. The one part of the weekend where the program gets set down for four hours.",
            },
          ].map((g) => (
            <div
              key={g.term}
              style={{
                padding: "24px 28px",
                border: "1px solid rgba(214,162,78,0.25)",
                background: "rgba(11,10,8,0.35)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "var(--gold)",
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                {g.term}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--parchment)",
                  opacity: 0.85,
                  lineHeight: 1.55,
                }}
              >
                {g.def}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Common questions — plain answers */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="section__eyebrow">
          <span>PLATE · VIII · ii</span>
          <span className="sep" />
          <span>ASKED OFTEN</span>
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
          Answered <em style={{ color: "var(--gold)" }}>plainly.</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              q: "Do I have to be a certain age?",
              a: "AA itself does not set a membership age. Local YPAA rooms may describe who they are for, but there is no single national rule that applies everywhere.",
            },
            {
              q: "Can I go if I am just curious?",
              a: "If a meeting is open, yes. Open meetings welcome anyone who wants to learn more. Closed meetings are for people who identify as having a desire to stop drinking.",
            },
            {
              q: "Is YPAA the only place young people recover?",
              a: "No. Plenty of young people get sober in mixed-age meetings and never identify strongly with YPAA. It is one lane into recovery, not the only one.",
            },
          ].map((f) => (
            <article
              key={f.q}
              style={{
                padding: "26px 28px",
                border: "1px solid rgba(214,162,78,0.2)",
                background: "rgba(11,10,8,0.4)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "var(--parchment)",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                }}
              >
                {f.q}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--parchment)",
                  opacity: 0.82,
                  marginTop: 14,
                  marginBottom: 0,
                }}
              >
                {f.a}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 120 }}>
        <div className="section__eyebrow">
          <span>THE THREE PILLARS</span>
          <span className="sep" />
        </div>
        <div
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {[
            { n: "I", title: "Meetings", body: "Weekly rooms, same time, same place. The backbone. You don&rsquo;t need a conference to be in YPAA — you need a home group." },
            { n: "II", title: "Conferences", body: "Annual weekends. Where the vocabulary travels. Where last year&rsquo;s regulars become this year&rsquo;s committee." },
            { n: "III", title: "Committees", body: "The unpaid work. Registration, hospitality, treasury, program. This is how a conference happens — dozens of young AAs, no one getting paid, on purpose." },
          ].map((p) => (
            <div key={p.n}>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: 64,
                  fontWeight: 300,
                  color: "var(--gold)",
                  opacity: 0.55,
                  lineHeight: 1,
                }}
              >
                {p.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "var(--parchment)",
                  marginTop: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14.5,
                  color: "var(--parchment)",
                  opacity: 0.82,
                  lineHeight: 1.65,
                  marginTop: 10,
                }}
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/meetings" className="btn btn--gold">
            FIND A MEETING
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            SEE THE CONFERENCES →
          </Link>
        </div>
      </section>
    </>
  )
}
