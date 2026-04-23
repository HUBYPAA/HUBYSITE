import type { Metadata } from "next"
import Link from "next/link"
import { RunningHead } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "Safety & Anonymity · HUBYPAA",
  description:
    "Safety notes, anonymity reminders, and crisis resources for anyone using the site or moving through YPAA spaces.",
}

export default function SafetyPage() {
  return (
    <section className="shell" aria-labelledby="safety-title">
      {/* ── Hero ── */}
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">Safety & Anonymity</span>}
          center={<span>Important enough to live outside the footer</span>}
        />
        <h1 id="safety-title" className="section-head">
          Anonymity is not decorative copy.{" "}
          <em>Safety is not an afterthought.</em>
        </h1>
        <p className="lede max-w-3xl">
          If the site is going to help people move through meetings and
          conferences, it should also make the basic guardrails easy to find.
        </p>
      </header>

      {/* ── Need help now / Anonymity ── */}
      <section className="section section--tight">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="frame">
            <RunningHead left={<span className="smallcaps">Need help now</span>} />
            <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
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
                <div key={item.name} className="card p-3.5 sm:p-4">
                  <p className="text-base font-medium text-ink">{item.name}</p>
                  <p className="mt-1.5 text-sm leading-6 text-stone-700 sm:mt-2 sm:leading-7">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="frame frame--carved">
            <RunningHead left={<span className="smallcaps">Anonymity</span>} />
            <div className="mt-5 space-y-5 text-sm leading-7 text-stone-700 sm:mt-6 sm:space-y-6">
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
        </div>
      </section>

      {/* ── Reminders ── */}
      <section className="section section--sm">
        <RunningHead
          left={<span className="smallcaps">Reminders</span>}
          center={<span>Before you</span>}
        />
        <h2 className="subhead">
          Three <em>small pauses.</em>
        </h2>

        <div className="prose-grid">
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
            <article key={item.title} className="prose-card">
              <p className="prose-card__kicker">Reminder</p>
              <h2 className="mt-3 display-page sm:mt-4">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-700 sm:mt-4">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}
