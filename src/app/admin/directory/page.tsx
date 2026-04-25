import type { Metadata } from "next"
import { PageShell } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin, canManageDirectory } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { applyDirectoryLifecycle } from "@/lib/hub/lifecycle"
import { approveContact, purgeContact, runLifecycle } from "./actions"

export const metadata: Metadata = { title: "Admin · Directory" }
export const dynamic = "force-dynamic"

export default async function AdminDirectoryPage() {
  const me = await requireAdmin()
  if (!canManageDirectory(me)) {
    return (
      <PageShell tone="admin">
        <section className="shell">
          <div className="card">You don&rsquo;t have directory-admin access.</div>
        </section>
      </PageShell>
    )
  }
  await applyDirectoryLifecycle()
  const [contacts, regions] = await Promise.all([
    readAll("directory_contacts"),
    readAll("regions"),
  ])
  const regionMap = new Map(regions.map((r) => [r.id, r]))
  const pending = contacts.filter((c) => c.status === "pending")
  const approved = contacts.filter((c) => c.status === "approved")
  const purged = contacts.filter((c) => c.status === "purged")

  return (
    <PageShell tone="admin">
      <PortalHeader
        kicker="Admin · Directory"
        title="Manage the private directory."
        subtitle="Approve new contacts, choose their lists, and purge stale records."
      />
      <section className="shell pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="display-2">Pending ({pending.length})</h2>
          <form action={runLifecycle}>
            <button className="btn btn-secondary btn-sm">Run lifecycle now</button>
          </form>
        </div>
        {pending.length === 0 ? (
          <p className="card card-quiet body-sm">No pending contacts.</p>
        ) : (
          <div className="grid gap-3">
            {pending.map((c) => (
              <form key={c.id} action={approveContact} className="card">
                <input type="hidden" name="id" value={c.id} />
                <p className="text-sm font-medium">{c.name}</p>
                <p className="body-sm">{c.role} · {c.committee}</p>
                <p className="caption mono mt-1">{c.email}{c.regionId ? ` · ${regionMap.get(c.regionId)?.label}` : ""}</p>
                {c.willingToHelpWith ? <p className="body-sm mt-2 italic">&ldquo;{c.willingToHelpWith}&rdquo;</p> : null}

                <fieldset className="mt-3">
                  <legend className="caption">Lists</legend>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    <label className="flex items-center gap-2"><input type="checkbox" name="listings" value="current" defaultChecked /> Current</label>
                    <label className="flex items-center gap-2"><input type="checkbox" name="listings" value="helper" defaultChecked={c.consentHelperList} /> Helper</label>
                    <label className="flex items-center gap-2"><input type="checkbox" name="listings" value="past" defaultChecked={c.consentPastList} /> Past</label>
                  </div>
                </fieldset>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn btn-amber btn-sm">Approve</button>
                </div>
              </form>
            ))}
          </div>
        )}
      </section>

      <section className="shell pb-10">
        <h2 className="display-2 mb-4">Approved ({approved.length})</h2>
        <div className="grid gap-2">
          {approved.map((c) => (
            <form key={c.id} action={purgeContact} className="card card-quiet flex flex-wrap items-center gap-3">
              <input type="hidden" name="id" value={c.id} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="body-sm">{c.role} · {c.committee} · lists: {c.listings.join(", ") || "—"}</p>
                <p className="caption mono mt-1">term ends: {c.termEndsAt ?? "—"} · remain-consent: {c.consentRemainAfterTerm ? "yes" : "no"}</p>
              </div>
              <button className="btn btn-secondary btn-sm">Purge</button>
            </form>
          ))}
        </div>
      </section>

      {purged.length > 0 ? (
        <section className="shell pb-16">
          <h2 className="display-2 mb-4">Purged ({purged.length})</h2>
          <div className="grid gap-2">
            {purged.map((c) => (
              <div key={c.id} className="card card-quiet flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium line-through">{c.name}</p>
                  <p className="caption mono">{c.purgedAt ? `purged ${c.purgedAt.slice(0, 10)}` : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  )
}
