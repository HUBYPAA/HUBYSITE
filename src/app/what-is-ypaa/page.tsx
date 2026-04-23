import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "What is YPAA · The Glossary",
  description:
    "Young people's AA: what it is, how the conferences work, and the vocabulary of the weekends.",
}

const GLOSSARY = [
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
    def: "How host cities rotate. Each year’s conference picks the next host by vote.",
  },
  {
    term: "Hospitality",
    def: "The suite where the conference doesn’t end. Run by volunteers, open until dawn.",
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
    def: "Funded registrations. Every conference holds some back for young people who can’t afford the full price.",
  },
  {
    term: "Panels",
    def: "The content track. A panel is 3–5 people on a topic — service, step work, sponsorship, coming back.",
  },
  {
    term: "Dance",
    def: "Saturday night. The one part of the weekend where the program gets set down for four hours.",
  },
]

const FAQ = [
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
]

const PILLARS = [
  {
    n: "I",
    title: "Meetings",
    body: "Weekly rooms, same time, same place. The backbone. You don’t need a conference to be in YPAA — you need a home group.",
  },
  {
    n: "II",
    title: "Conferences",
    body: "Annual weekends. Where the vocabulary travels. Where last year’s regulars become this year’s committee.",
  },
  {
    n: "III",
    title: "Committees",
    body: "The unpaid work. Registration, hospitality, treasury, program. This is how a conference happens — dozens of young AAs, no one getting paid, on purpose.",
  },
]

export default function WhatIsYpaaPage() {
  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>The glossary</span>
          <span className="sep" aria-hidden />
          <span>Plate VIII</span>
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

      <section className="section section--tight">
        <div className="prose-grid prose-grid--wide">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="glossary-card">
              <h3 className="glossary-card__term">{g.term}</h3>
              <p className="glossary-card__def">{g.def}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Asked often</span>
        </div>
        <h2 className="subhead">
          Answered <em>plainly.</em>
        </h2>

        <div className="prose-grid">
          {FAQ.map((f) => (
            <article key={f.q} className="prose-card">
              <h3 className="prose-card__title">{f.q}</h3>
              <p className="prose-card__body">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>The three pillars</span>
        </div>
        <div
          className="prose-grid"
          style={{ marginTop: "var(--space-8)" }}
        >
          {PILLARS.map((p) => (
            <div key={p.n} className="pillar">
              <span className="pillar__n">{p.n}</span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="section__actions">
          <Link href="/meetings" className="btn btn--gold">
            Find a meeting
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            See the conferences
          </Link>
        </div>
      </section>
    </>
  )
}
