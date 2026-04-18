import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = {
  title: "Safety & anonymity",
  description:
    "Safety notes, anonymity reminders, and crisis resources for anyone using the site or moving through YPAA spaces.",
}

const RESOURCES = [
  { name: "SAMHSA National Helpline",   detail: "1-800-662-4357 · confidential, 24/7", href: "tel:18006624357", action: "Call" },
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988",                  href: "tel:988",          action: "Open" },
  { name: "Crisis Text Line",           detail: "Text HOME to 741741",                 href: "sms:741741",       action: "Text" },
  { name: "AA General Service Office",  detail: "212-870-3400",                         href: "tel:2128703400",   action: "Call" },
]

const PAUSES = [
  { title: "Before you post.",   body: "Ask whether what you are sharing exposes someone else, even indirectly." },
  { title: "Before you travel.", body: "Verify event details from the source link, especially if a record still carries a scaffold note." },
  { title: "Before you assume.", body: "A younger room can still need boundaries, sponsorship, and the same care any AA space needs." },
]

export default function SafetyPage() {
  return (
    <>
      <PortalHeader
        kicker="Safety & anonymity"
        title="Important enough to live outside the footer."
        subtitle="Anonymity is not decorative copy. Safety is not an afterthought. The basic guardrails should be easy to find."
      />

      <section className="shell">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="card">
            <p className="eyebrow">Need help right now</p>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(1.75rem, 3vw, 2.2rem)",
                letterSpacing: "-0.022em",
                lineHeight: 1.08,
                color: "var(--color-ink)",
              }}
            >
              Use the real-world support first.
            </h2>
            <p className="body mt-3">
              This page can orient you, but it is not the emergency response.
            </p>

            <div className="mt-8 space-y-3">
              {RESOURCES.map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  className="flex items-center justify-between gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-vault)] hover:bg-[var(--color-surface-raised)]"
                >
                  <div>
                    <p className="font-medium text-[var(--color-ink)]">{r.name}</p>
                    <p className="body-sm mt-0.5">{r.detail}</p>
                  </div>
                  <span className="tag tag-vault">
                    <Phone className="h-3 w-3" />
                    {r.action}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-5">
            <article className="card">
              <p className="eyebrow">Anonymity</p>
              <div className="prose mt-4">
                <p>
                  What people share in meetings is not material for screenshots,
                  group chats, or casual retelling. The site follows the same
                  restraint by avoiding personal names, attendance data, and
                  public member profiles.
                </p>
                <p>
                  Online spaces deserve the same caution. Do not record meetings.
                  Do not share private Zoom details more broadly than intended.
                  A digital room does not change the standard.
                </p>
                <p>
                  At conferences, safety is practical: pay attention to the
                  culture of the room, look for safety teams or host contacts,
                  and tell someone trustworthy if a situation feels wrong.
                </p>
              </div>
            </article>

            <article className="card card-quiet">
              <p className="eyebrow">If a listing feels wrong</p>
              <p className="body mt-3">
                Broken location data, stale links, or unclear event details are
                a safety problem too. Send the correction instead of assuming
                someone else already did.
              </p>
              <Link href="/submit" className="btn btn-vault mt-5">
                Report a problem
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="mb-8 max-w-xl">
            <p className="eyebrow">Before you</p>
            <h2 className="display-2 mt-3">Three small pauses.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {PAUSES.map((p, i) => (
              <article key={p.title} className="card">
                <p className="caption mono">Pause 0{i + 1}</p>
                <h3
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    fontSize: "1.35rem",
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  {p.title}
                </h3>
                <p className="body mt-3">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
