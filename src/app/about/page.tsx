import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About · HUBYPAA",
  description:
    "A national directory for young people's AA meetings, conference records, and supporting context.",
}

export default function AboutPage() {
  return (
    <section className="shell" aria-labelledby="about-title">
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
        <h1 id="about-title" className="display-page">
          The information is real.{" "}
          <em>The path to it is usually messy.</em>
        </h1>
        <p
          className="lede"
          style={{ marginTop: "var(--space-4)", marginInline: "auto" }}
        >
          Meetings are scattered. Conference details move around.
          Newcomers do not need more noise. They need orientation.
        </p>
      </header>

      <div className="quiet-prose">
        <h2>What this site is.</h2>
        <p>
          A national directory for young people&rsquo;s AA meetings,
          conference records, and supporting context. It&rsquo;s designed to
          help someone answer basic questions quickly: Is there a room near
          me? What&rsquo;s coming up? What does YPAA mean? Where do I send a
          correction?
        </p>
        <p>
          It&rsquo;s not trying to replace local AA service structures.
          It&rsquo;s a clearer front door into them.
        </p>

        <h2>What it&rsquo;s not.</h2>
        <ul>
          <li>Not an official AA body.</li>
          <li>Not a social feed.</li>
          <li>Not a place for personal profiles, attendance data, or public member names.</li>
          <li>Not a claim that every record is already perfect.</li>
        </ul>

        <h2>Principles.</h2>
        <p>
          <em>Usefulness first.</em> The fastest path to value is a map, a
          readable list, and a small amount of honest context.
        </p>
        <p>
          <em>Restraint on purpose.</em> The design stays calm, spacious,
          and editorial so the information feels considered rather than
          overpackaged.
        </p>
        <p>
          <em>Trust through honesty.</em> Conference records that are still
          scaffold-level should say so. The product should not fake
          certainty.
        </p>

        <h2>Why now.</h2>
        <p>
          Young people already travel between cities, conferences,
          committees, and home groups. The network behaves like a product
          even when nobody has designed it like one. This site treats that
          reality seriously.
        </p>

        <h2>Keep it better.</h2>
        <p>
          The long-term health of this directory depends on people sending
          precise corrections and better source links. The site should get
          stronger because the network uses it, not because the copy sounds
          confident.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "var(--space-3)",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingBottom: "var(--space-16)",
        }}
      >
        <Link href="/submit" className="btn btn--gold">
          Submit / Update
        </Link>
        <Link href="/safety" className="btn btn--ghost">
          How we keep this safe
        </Link>
      </div>
    </section>
  )
}
