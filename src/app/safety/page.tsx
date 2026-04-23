import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Safety · The Pause",
  description:
    "How HUBYPAA handles privacy, anonymity, and the Traditions when publishing meeting data.",
}

const RESOURCES = [
  {
    name: "SAMHSA National Helpline",
    detail: "1-800-662-4357 · confidential · 24/7",
    href: "tel:18006624357",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Call or text 988",
    href: "tel:988",
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741",
    href: "sms:741741",
  },
  {
    name: "AA General Service Office",
    detail: "212-870-3400",
    href: "tel:2128703400",
  },
]

const PAUSES: Array<{ n: string; t: string; b: string }> = [
  {
    n: "I",
    t: "Before you post.",
    b: "Ask whether what you're sharing exposes someone else, even indirectly. Screenshots are not for meetings.",
  },
  {
    n: "II",
    t: "Before you travel.",
    b: "Verify event details from the host's own site, especially if a record still carries a scaffold note.",
  },
  {
    n: "III",
    t: "Before you assume.",
    b: "A younger room can still need boundaries, sponsorship, and the same care any AA space needs.",
  },
]

export default function SafetyPage() {
  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>The pause</span>
          <span className="sep" aria-hidden />
          <span>Plate VII</span>
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

      <section className="section section--tight prose-with-aside">
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

        <aside className="aside-box aside-box--coral">
          <div className="aside-box__kicker">If you&rsquo;re in trouble</div>
          <p className="aside-box__title">
            Call a meeting, not a hotline.
          </p>
          <p className="aside-box__body">
            If you&rsquo;re in crisis, the fastest path is often a live
            young people&rsquo;s meeting on Zoom. Find one now &mdash; the
            coral stars on the sky are starting soon.
          </p>
          <Link href="/meetings" className="btn btn--primary">
            Find a meeting now
          </Link>
        </aside>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Need help right now</span>
        </div>
        <h2 className="subhead">
          Use the <em>real-world support</em> first.
        </h2>
        <p className="section__lede">
          This page can orient you, but it is not the emergency response.
        </p>

        <div className="prose-grid">
          {RESOURCES.map((r) => (
            <a
              key={r.name}
              href={r.href}
              className="prose-card prose-card--interactive"
            >
              <span className="prose-card__kicker">Call</span>
              <div className="prose-card__title">{r.name}</div>
              <div className="prose-card__meta">{r.detail}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Before you</span>
        </div>
        <h2 className="subhead">
          Three <em>small pauses.</em>
        </h2>

        <div className="prose-grid">
          {PAUSES.map((p) => (
            <div key={p.n} className="prose-card">
              <span
                className="prose-card__kicker"
                style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", letterSpacing: 0, fontSize: "var(--text-lg)", textTransform: "none" }}
              >
                {p.n}
              </span>
              <div className="prose-card__title">{p.t}</div>
              <p className="prose-card__body">{p.b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}