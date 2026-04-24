import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "What is YPAA · HUBYPAA",
  description:
    "Young people's AA: what it is, how the conferences work, and the vocabulary of the weekends.",
}

export default function WhatIsYpaaPage() {
  return (
    <section className="shell" aria-labelledby="whatis-title">
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
        <h1 id="whatis-title" className="display-page">
          There is no separate set of steps,{" "}
          <em>no different fellowship, no alternate AA.</em>
        </h1>
        <p
          className="lede"
          style={{ marginTop: "var(--space-4)", marginInline: "auto" }}
        >
          YPAA is just the name many people use for the young people&rsquo;s
          network within AA. There also is not one universal age cutoff.
          Local groups and conferences may describe themselves differently.
        </p>
      </header>

      <div className="quiet-prose">
        <h2>What people usually mean.</h2>
        <ul>
          <li>Meetings where the room tends to be younger.</li>
          <li>Conferences built around fellowship, speakers, workshops, and service.</li>
          <li>Committees or host structures that help organize those events.</li>
          <li>A social and service network that can make sobriety feel less isolating.</li>
        </ul>

        <h2>Do I have to be a certain age?</h2>
        <p>
          AA itself does not set a membership age requirement. Local YPAA
          spaces may describe who they are for, but there is no single
          national rule that applies everywhere.
        </p>

        <h2>Can I go if I&rsquo;m just curious?</h2>
        <p>
          If a meeting is open, yes. Open meetings welcome anyone who wants
          to learn more. Closed meetings are generally for people who
          identify as having a desire to stop drinking.
        </p>

        <h2>Meetings.</h2>
        <p>
          A YPAA meeting is still an AA meeting. Same steps, same
          traditions, same spiritual aim. The difference is often the age
          and energy of the room.
        </p>

        <h2>Conferences.</h2>
        <p>
          YPAA conferences usually mix speakers, workshops, social time,
          committee business, and travel. They can become major nodes in
          the wider network.
        </p>

        <h2>Service.</h2>
        <p>
          A lot of people first get involved through host committees and
          conference service. For many, that&rsquo;s where fellowship
          becomes responsibility.
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
        <Link href="/meetings" className="btn btn--gold">
          Find a meeting
        </Link>
        <Link href="/conferences" className="btn btn--ghost">
          See the conferences
        </Link>
      </div>
    </section>
  )
}
