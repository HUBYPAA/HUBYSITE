import type { Metadata } from "next"
import { LedgerRow, LedgerRows, MarginalRail, PageShell, Surface } from "@/lib/components/atlas"
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
          <Surface>You don&rsquo;t have directory-admin access.</Surface>
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
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)]">
        <div className="grid gap-5">
          <Surface className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="page-kicker">Pending contacts</p>
                <h2 className="heading-lg">{pending.length} waiting for approval.</h2>
              </div>
              <form action={runLifecycle}>
                <button className="btn btn-secondary btn-sm">Run lifecycle now</button>
              </form>
            </div>
            {pending.length === 0 ? (
              <p className="body-sm" style={{ margin: 0 }}>
                No pending contacts.
              </p>
            ) : (
              <div className="grid gap-3">
                {pending.map((c) => (
                  <Surface key={c.id} className="grid gap-4">
                    <form action={approveContact} className="grid gap-4">
                      <input type="hidden" name="id" value={c.id} />
                      <div className="min-w-0">
                        <p className="page-kicker">Pending review</p>
                        <h3 className="heading-md">{c.name}</h3>
                        <p className="body-sm" style={{ margin: "0.35rem 0 0" }}>
                          {c.role} · {c.committee}
                        </p>
                        <p className="caption mono" style={{ marginTop: "0.5rem" }}>
                          {c.email}
                          {c.regionId ? ` · ${regionMap.get(c.regionId)?.label}` : ""}
                        </p>
                        {c.willingToHelpWith ? (
                          <p className="body-sm italic" style={{ margin: "0.75rem 0 0" }}>
                            &ldquo;{c.willingToHelpWith}&rdquo;
                          </p>
                        ) : null}
                      </div>

                      <fieldset>
                        <legend className="caption">Lists</legend>
                        <div className="mt-2 flex flex-wrap gap-3 text-sm">
                          <label className="flex items-center gap-2"><input type="checkbox" name="listings" value="current" defaultChecked /> Current</label>
                          <label className="flex items-center gap-2"><input type="checkbox" name="listings" value="helper" defaultChecked={c.consentHelperList} /> Helper</label>
                          <label className="flex items-center gap-2"><input type="checkbox" name="listings" value="past" defaultChecked={c.consentPastList} /> Past</label>
                        </div>
                      </fieldset>
                      <div className="flex flex-wrap gap-2">
                        <button className="btn btn-amber btn-sm">Approve</button>
                      </div>
                    </form>
                  </Surface>
                ))}
              </div>
            )}
          </Surface>

          <Surface className="grid gap-4">
            <div>
              <p className="page-kicker">Approved contacts</p>
              <h2 className="heading-lg">{approved.length} visible in the portal.</h2>
            </div>
            {approved.length === 0 ? (
              <p className="body-sm" style={{ margin: 0 }}>
                No approved contacts.
              </p>
            ) : (
              <LedgerRows>
                {approved.map((c) => (
                  <LedgerRow
                    key={c.id}
                    label="Approved"
                    title={c.name}
                    summary={`${c.role} · ${c.committee} · lists: ${c.listings.join(", ") || "—"}`}
                    meta={`Term ends ${c.termEndsAt ?? "—"}`}
                    actions={
                      <form action={purgeContact}>
                        <input type="hidden" name="id" value={c.id} />
                        <button className="btn btn-secondary btn-sm">Purge</button>
                      </form>
                    }

                  />
                ))}
              </LedgerRows>
            )}
          </Surface>

          {purged.length > 0 ? (
            <Surface className="grid gap-4">
              <div>
                <p className="page-kicker">Purged</p>
                <h2 className="heading-lg">{purged.length} historical removals.</h2>
              </div>
              <LedgerRows>
                {purged.map((c) => (
                  <LedgerRow
                    key={c.id}
                    label="Purged"
                    title={<span className="line-through">{c.name}</span>}
                    summary={c.purgedAt ? `Purged ${c.purgedAt.slice(0, 10)}` : "Removed"}
                    meta="Archive"

                  />
                ))}
              </LedgerRows>
            </Surface>
          ) : null}
        </div>

        <MarginalRail kicker="Consent" title="Retention rules">
          <p>Current contacts stay visible according to the lists you approve here.</p>
          <p>Contacts without remain-after-term consent are purged automatically after their term end date.</p>
        </MarginalRail>
      </section>
    </PageShell>
  )
}
