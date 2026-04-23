import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About · The Keeper",
  description:
    "Who keeps the HUBYPAA catalog, how a star gets inscribed, and what we publish (and don't).",
}

const PRINCIPLES: Array<[string, string]> = [
  ["I", "A star is placed, not claimed."],
  ["II", "A meeting is a door, not a brand."],
  ["III", "We verify by hand. We publish by hand."],
  ["IV", "We keep dead stars on the record, dimmed."],
  ["V", "We hold Tradition 11 like it's glass."],
  ["VI", "Free for always. Supported by young AAs."],
]

const BOUNDARIES = [
  "Not an official AA body. The directory follows the spirit of the Traditions but does not speak for AA as a whole.",
  "Not a social feed. No public profiles, no like counts, no algorithmic timeline.",
  "Not a place for personal names, attendance data, or member tracking. Anonymity is structural here, not decorative.",
  "Not a claim that every record is already perfect. Some entries are scaffolds and say so.",
]

export default function AboutPage() {
  return (
    <>
      <section className="section section--hero">
        <div className="section__eyebrow">
          <span>The keeper</span>
          <span className="sep" aria-hidden />
          <span>Plate VI</span>
        </div>
        <h1 className="section__title">
          A catalog, kept <em>by hand.</em>
        </h1>
        <p className="section__lede">
          The information is real. The path to it is usually messy. This is
          the cleaner front door &mdash; a hand-verified directory of young
          people&rsquo;s AA meetings and conferences. We think a star should
          only go on the sky if someone walked to the door.
        </p>
      </section>

      <section className="section section--tight two-col-prose">
        <div className="section__body">
          <p>
            Every entry starts as a submission. A helper reads it. If the
            meeting checks out &mdash; the door exists, the room exists,
            the time matches &mdash; we place the star. If it doesn&rsquo;t,
            we quietly bounce it back with a note. We don&rsquo;t publish
            ghosts.
          </p>
          <p>
            We update coordinates when a meeting moves. We dim the star
            when a meeting dies. We never delete the record, because
            somebody googling a group they once loved deserves to see that
            it was real, and that it&rsquo;s over.
          </p>
          <p>
            What we don&rsquo;t do: we don&rsquo;t publish{" "}
            <em>member names</em>, attendance, endorsements, commercial
            links, or anything that crosses a Tradition. We don&rsquo;t rank
            meetings. We don&rsquo;t feature personalities. The catalog is
            about places and hours, not people.
          </p>
          <p>
            The site is free. It costs us nothing to run but time, and time
            we have.
          </p>
        </div>

        <aside className="aside-box">
          <div className="aside-box__kicker">Principles · Roman order</div>
          <ol className="roman-list">
            {PRINCIPLES.map(([roman, body]) => (
              <li key={roman} className="roman-list__item">
                <span className="roman-list__n">{roman}</span>
                <span className="roman-list__body">{body}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Boundaries</span>
        </div>
        <h2 className="subhead">
          What this site <em>is not.</em>
        </h2>

        <div className="prose-grid prose-grid--wide">
          {BOUNDARIES.map((t) => (
            <div key={t} className="prose-card prose-card--coral">
              <span className="prose-card__kicker">Not</span>
              <p className="prose-card__body">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--sm">
        <div className="section__eyebrow">
          <span>Keep it better</span>
        </div>
        <h2 className="subhead">
          The catalog stays useful only if{" "}
          <em>corrections move faster than drift.</em>
        </h2>
        <p className="section__lede">
          Good information is a form of care. Broken link, meeting that
          moved, wrong dates &mdash; if you see it, send it. The site gets
          stronger because the network uses it, not because the copy sounds
          confident.
        </p>
        <div className="section__actions">
          <Link href="/submit" className="btn btn--primary">
            Inscribe a star
          </Link>
          <Link href="/safety" className="btn btn--ghost">
            How we keep this safe
          </Link>
          <Link href="/what-is-ypaa" className="btn btn--ghost">
            What YPAA means
          </Link>
        </div>
      </section>
    </>
  )
}