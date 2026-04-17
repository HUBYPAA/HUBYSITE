import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Safety & Anonymity",
  description:
    "Safety notes, anonymity reminders, and crisis resources for anyone using the site or moving through YPAA spaces.",
}

export default function SafetyPage() {
  return (
    <div className="site-shell pb-16 pt-24 sm:pt-28">
      <span className="section-kicker">Safety & Anonymity</span>
      <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
        Important enough to live outside the footer.
      </h1>
      <p className="page-intro mt-4 sm:mt-5">
        Anonymity is not decorative copy. Safety is not an afterthought. If the
        site is going to help people move through meetings and conferences, it
        should also make the basic guardrails easy to find.
      </p>

      <section className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="panel-vault rise-in p-5 sm:p-7">
          <span className="section-kicker">Need help now</span>
          <p className="mt-4 text-sm leading-7 text-[rgba(210,203,194,0.68)] sm:text-base">
            If the need is immediate, use the real-world support first. This
            page can orient you, but it is not the emergency response.
          </p>
          <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
            {[
              {
                name: "SAMHSA National Helpline",
                detail: "1-800-662-4357 · confidential, 24/7",
                href: "tel:18006624357",
                action: "Call",
              },
              {
                name: "988 Suicide & Crisis Lifeline",
                detail: "Call or text 988",
                href: "tel:988",
                action: "Open",
              },
              {
                name: "Crisis Text Line",
                detail: "Text HOME to 741741",
                href: "sms:741741",
                action: "Text",
              },
              {
                name: "AA General Service Office",
                detail: "212-870-3400",
                href: "tel:2128703400",
                action: "Call",
              },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-[var(--radius-md)] border border-[rgba(240,235,228,0.1)] bg-[rgba(240,235,228,0.05)] p-4 hover:bg-[rgba(240,235,228,0.1)] sm:p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-medium text-[rgba(240,235,228,0.94)]">{item.name}</p>
                    <p className="mt-1.5 text-sm leading-6 text-[rgba(210,203,194,0.62)] sm:mt-2 sm:leading-7">
                      {item.detail}
                    </p>
                  </div>
                  <span className="inline-flex min-h-[2.25rem] items-center rounded-[0.75rem] border border-[rgba(200,164,78,0.2)] bg-[rgba(200,164,78,0.08)] px-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-gold-soft)]">
                    {item.action}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="panel-raised rise-in p-5 sm:p-7 md:p-8">
            <span className="section-kicker">Anonymity</span>
            <div className="mt-5 space-y-5 text-sm leading-7 text-muted sm:mt-6 sm:space-y-6">
              <p>
                What people share in meetings is not material for screenshots,
                group chats, or casual retelling. The site follows the same
                restraint by avoiding personal names, attendance data, and public
                member profiles.
              </p>
              <p>
                Online spaces deserve the same caution. Do not record meetings.
                Do not share private Zoom details more broadly than intended. Do
                not assume a digital room changes the standard.
              </p>
              <p>
                At conferences, safety is practical: pay attention to the culture
                of the room, look for safety teams or host contacts, and tell
                someone trustworthy if a situation feels wrong.
              </p>
            </div>
          </div>

          <div className="panel-outline rise-in p-5 sm:p-7">
            <p className="meta-label">If a listing feels unsafe or wrong</p>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Broken location data, stale links, or unclear event details are a
              safety problem too. Send the correction instead of assuming someone
              else already did.
            </p>
            <Link href="/submit" className="action-secondary mt-5 sm:mt-6">
              Report a problem
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-10 sm:mt-12">
        <div className="processional-divider" />
      </div>

      <section className="page-band">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {[
            {
              title: "Before you post",
              body: "Ask whether what you are sharing exposes someone else, even indirectly.",
            },
            {
              title: "Before you travel",
              body: "Verify event details from the source link, especially if a conference record still carries a scaffold note.",
            },
            {
              title: "Before you assume",
              body: "A younger room can still need boundaries, sponsorship, and the same care any AA space needs.",
            },
          ].map((item) => (
            <article key={item.title} className="panel p-5 sm:p-6">
              <p className="meta-label">Reminder</p>
              <h2 className="mt-3 font-serif text-xl tracking-[-0.04em] text-ink sm:mt-4 sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted sm:mt-4">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
