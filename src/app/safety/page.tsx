import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Safety & Anonymity",
  description:
    "Safety notes, anonymity reminders, and crisis resources for anyone using the site or moving through YPAA spaces.",
}

export default function SafetyPage() {
  return (
    <div className="site-shell pb-16 pt-28">
      <span className="section-kicker">Safety & Anonymity</span>
      <h1 className="page-title mt-5 max-w-5xl">
        Important enough to live outside the footer.
      </h1>
      <p className="page-intro mt-5">
        Anonymity is not decorative copy. Safety is not an afterthought. If the
        site is going to help people move through meetings and conferences, it
        should also make the basic guardrails easy to find.
      </p>

      <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="panel-raised p-7">
          <span className="section-kicker">Need help now</span>
          <div className="mt-6 space-y-4">
            {[
              {
                name: "SAMHSA National Helpline",
                detail: "1-800-662-4357 · confidential, 24/7",
              },
              {
                name: "988 Suicide & Crisis Lifeline",
                detail: "Call or text 988",
              },
              {
                name: "Crisis Text Line",
                detail: "Text HOME to 741741",
              },
              {
                name: "AA General Service Office",
                detail: "212-870-3400",
              },
            ].map((item) => (
              <div key={item.name} className="panel-muted p-4">
                <p className="text-base font-medium text-ink">{item.name}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-7 md:p-8">
          <span className="section-kicker">Anonymity</span>
          <div className="mt-6 space-y-6 text-sm leading-7 text-muted">
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
      </section>

      <section className="page-band">
        <div className="grid gap-6 lg:grid-cols-3">
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
            <article key={item.title} className="panel p-6">
              <p className="meta-label">Reminder</p>
              <h2 className="mt-4 font-serif text-2xl tracking-[-0.04em] text-ink">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
