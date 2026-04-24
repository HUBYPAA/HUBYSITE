import type { Metadata } from "next"
import { SubmitForm } from "./submit-form"

export const metadata: Metadata = {
  title: "Submit / Update · HUBYPAA",
  description:
    "Send meeting submissions, conference updates, corrections, or general notes through a cleaner intake flow.",
}

export default function SubmitPage() {
  return (
    <section className="shell" aria-labelledby="submit-title">
      <header
        style={{
          maxWidth: "60ch",
          margin: "0 auto",
          textAlign: "center",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-8)",
        }}
      >
        <span className="starmark starmark--xl" aria-hidden style={{ display: "inline-block", marginBottom: "var(--space-5)" }} />
        <h1 id="submit-title" className="display-page">
          Send what you know <em>while it&rsquo;s fresh.</em>
        </h1>
        <p className="lede" style={{ marginTop: "var(--space-4)", marginInline: "auto" }}>
          Missing meetings, conference updates, broken links, bad dates, wrong
          cities, or anything else that makes a record weaker than it should be.
        </p>
      </header>

      <SubmitForm />
    </section>
  )
}
