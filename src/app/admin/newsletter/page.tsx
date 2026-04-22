import type { Metadata } from "next"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin, canManageNewsletter } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { getRegions } from "@/lib/hub/queries"
import { removeSubscriber, saveDraft } from "./actions"
import { PortalSubnav } from "@/lib/hub/portal-layout"

export const metadata: Metadata = { title: "Admin · Newsletter" }
export const dynamic = "force-dynamic"

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; draft?: string }>
}) {
  const me = await requireAdmin()
  if (!canManageNewsletter(me)) {
    return <section className="shell"><div className="card">You don&rsquo;t have newsletter-admin access.</div></section>
  }
  const [subs, events, drafts, regions] = await Promise.all([
    readAll("newsletter_subscribers"),
    readAll("events"),
    readAll("newsletter_drafts"),
    getRegions({ activeOnly: true }),
  ])
  const regionMap = new Map(regions.map((r) => [r.id, r]))
  const approvedEvents = events
    .filter((e) => e.status === "approved")
    .sort((a, b) => a.date.localeCompare(b.date))

  const { tab, draft: draftId } = await searchParams
  const activeTab = tab === "drafts" ? "drafts" : "subscribers"
  const activeDraft = drafts.find((d) => d.id === draftId)

  return (
    <>
      <PortalHeader
        kicker="Admin · Newsletter"
        title="Subscribers & drafts."
        subtitle="Nothing sends automatically. Sending is explicit, by a human, with a clear draft."
      />
      <PortalSubnav
        items={[
          { href: "/admin/newsletter?tab=subscribers", label: `Subscribers (${subs.length})`, active: activeTab === "subscribers" },
          { href: "/admin/newsletter?tab=drafts",       label: `Drafts (${drafts.length})`,   active: activeTab === "drafts" },
        ]}
      />

      <section className="shell pt-6 pb-16">
        {activeTab === "subscribers" ? (
          <div className="grid gap-2">
            {subs.length === 0 ? (
              <p className="card card-quiet body-sm">No subscribers yet.</p>
            ) : subs.map((s) => (
              <form key={s.id} action={removeSubscriber} className="card card-quiet flex flex-wrap items-center gap-3">
                <input type="hidden" name="id" value={s.id} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{s.name || s.email}</p>
                  <p className="body-sm mono">{s.email}</p>
                  <p className="caption mt-1">
                    Regions: {s.regionIds.length === 0 ? "all" : s.regionIds.map((rid) => regionMap.get(rid)?.label ?? rid).join(", ")}
                  </p>
                </div>
                <button className="btn btn-secondary btn-sm">Remove</button>
              </form>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="display-2">All drafts</p>
                <a href="/admin/newsletter?tab=drafts&draft=new" className="btn btn-amber btn-sm">New draft</a>
              </div>
              <div className="grid gap-2">
                {drafts.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).map((d) => (
                  <a key={d.id} href={`/admin/newsletter?tab=drafts&draft=${d.id}`} className="card card-quiet block">
                    <p className="text-sm font-medium">{d.subject}</p>
                    <p className="caption mono">{d.slug} · {d.status}</p>
                  </a>
                ))}
              </div>
            </div>
            <form action={saveDraft} className="card space-y-4">
              {activeDraft ? <input type="hidden" name="id" value={activeDraft.id} /> : null}
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="caption">Slug *</span>
                  <input name="slug" required defaultValue={activeDraft?.slug ?? ""} placeholder="e.g. 2025-nov" className="input mt-2" />
                </label>
                <label className="block">
                  <span className="caption">Subject *</span>
                  <input name="subject" required defaultValue={activeDraft?.subject ?? ""} className="input mt-2" />
                </label>
                <label className="block">
                  <span className="caption">Sender name</span>
                  <input name="senderName" defaultValue={activeDraft?.senderName ?? "YIS- HUBYPAA"} className="input mt-2" />
                </label>
                <label className="block">
                  <span className="caption">Sender email</span>
                  <input name="senderEmail" defaultValue={activeDraft?.senderEmail ?? ""} placeholder="news@example.com" className="input mt-2" />
                </label>
              </div>
              <label className="block">
                <span className="caption">Intro</span>
                <textarea name="intro" defaultValue={activeDraft?.intro ?? ""} className="input textarea mt-2" />
              </label>
              <fieldset>
                <legend className="caption">Regions (empty = all)</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {regions.map((r) => (
                    <label key={r.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="regionIds" value={r.id} defaultChecked={activeDraft?.regionIds.includes(r.id)} />
                      {r.label}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="caption">Events (approved)</legend>
                <div className="mt-2 grid gap-2 max-h-64 overflow-auto">
                  {approvedEvents.map((e) => (
                    <label key={e.id} className="flex items-start gap-2 text-sm">
                      <input type="checkbox" name="eventIds" value={e.id} defaultChecked={activeDraft?.eventIds.includes(e.id)} className="mt-1" />
                      <span>
                        <span className="font-medium">{e.title}</span>{" "}
                        <span className="caption mono">{e.date} · {regionMap.get(e.regionId)?.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="caption">Body (full newsletter markdown/text)</span>
                <textarea name="body" defaultValue={activeDraft?.body ?? ""} className="input textarea mt-2" style={{ minHeight: "220px" }} />
              </label>

              <div className="flex flex-wrap gap-2">
                <button name="action" value="save" className="btn btn-secondary btn-sm">Save draft</button>
                <button name="action" value="ready" className="btn btn-amber btn-sm">Mark ready</button>
                <button name="action" value="sent" className="btn btn-secondary btn-sm">Mark as sent</button>
                <button name="action" value="skipped" className="btn btn-secondary btn-sm">Skip this issue</button>
              </div>
              <p className="caption">
                Nothing here sends email directly. Export the draft and send it
                through your configured mailer. A future task can wire a
                provider in once there&rsquo;s one agreed on.
              </p>
            </form>
          </div>
        )}
      </section>
    </>
  )
}