import type { Metadata } from "next"
import { LedgerRow, LedgerRows, MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { decidePortalAccess, revokePortalAccess } from "./actions"

export const metadata: Metadata = { title: "Admin · Access" }
export const dynamic = "force-dynamic"

export default async function AdminAccessPage() {
  await requireAdmin()
  const [reqs, users] = await Promise.all([
    readAll("portal_access_requests"),
    readAll("users"),
  ])
  const userMap = new Map(users.map((u) => [u.id, u]))
  const pending = reqs.filter((r) => r.status === "pending").sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  const approvedUsers = users.filter((u) => u.portalAccess === "approved")

  return (
    <PageShell tone="admin">
      <PortalHeader
        kicker="Admin · Portal access"
        title="Who gets in."
        subtitle="Portal access is limited to current chairs and the HUBYPAA team. Review every request."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)]">
        <div className="grid gap-5">
          <Surface className="grid gap-4">
            <div>
              <p className="page-kicker">Pending access requests</p>
              <h2 className="heading-lg">{pending.length} waiting for review.</h2>
            </div>
            {pending.length === 0 ? (
              <p className="body-sm" style={{ margin: 0 }}>
                No pending requests.
              </p>
            ) : (
              <div className="grid gap-3">
                {pending.map((r) => {
                  const u = userMap.get(r.userId)
                  return (
                    <Surface key={r.id} tone="quiet" className="grid gap-4">
                      <form action={decidePortalAccess} className="grid gap-4">
                        <input type="hidden" name="id" value={r.id} />
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="page-kicker">Requested {r.createdAt.slice(0, 10)}</p>
                            <h3 className="heading-md">{u?.name ?? "Unknown user"}</h3>
                            <p className="body-sm mono" style={{ margin: "0.35rem 0 0" }}>
                              {u?.email ?? "—"}
                            </p>
                            <p className="body-sm" style={{ margin: "0.75rem 0 0" }}>
                              {r.position} · {r.committee}
                            </p>
                            {r.reason ? (
                              <p className="body-sm italic" style={{ margin: "0.75rem 0 0" }}>
                                &ldquo;{r.reason}&rdquo;
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <label className="block">
                          <span className="caption">Review note</span>
                          <textarea name="note" className="input textarea mt-2" placeholder="Optional note" />
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button name="decision" value="approved" className="btn btn-amber btn-sm">Approve</button>
                          <button name="decision" value="denied" className="btn btn-secondary btn-sm">Deny</button>
                        </div>
                      </form>
                    </Surface>
                  )
                })}
              </div>
            )}
          </Surface>

          <Surface className="grid gap-4">
            <div>
              <p className="page-kicker">Approved users</p>
              <h2 className="heading-lg">{approvedUsers.length} currently inside.</h2>
            </div>
            {approvedUsers.length === 0 ? (
              <p className="body-sm" style={{ margin: 0 }}>
                No approved users yet.
              </p>
            ) : (
              <LedgerRows>
                {approvedUsers.map((u) => (
                  <LedgerRow
                    key={u.id}
                    label="Approved"
                    title={u.name}
                    summary={
                      <>
                        <span className="mono">{u.email}</span>
                        <br />
                        Roles: {u.roles.length ? u.roles.join(", ") : "none"}
                      </>
                    }
                    meta="Portal"
                    actions={
                      <form action={revokePortalAccess}>
                        <input type="hidden" name="userId" value={u.id} />
                        <button className="btn btn-secondary btn-sm">Revoke</button>
                      </form>
                    }
                    tone="quiet"
                  />
                ))}
              </LedgerRows>
            )}
          </Surface>
        </div>

        <div className="grid gap-4">
          <Surface tone="quiet">
            <StatusRail
              steps={[
                {
                  label: "Request sent",
                  detail: "A signed-in user asks for portal access.",
                  state: pending.length > 0 ? "complete" : "current",
                },
                {
                  label: "Human review",
                  detail: "Admins check current position, committee, and any context note.",
                  state: "current",
                },
                {
                  label: "Approved or denied",
                  detail: "Approval grants portal access. Denial keeps protected routes closed.",
                  state: "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Policy" title="What counts">
            <p>Current service position, real committee context, and a clear contact path.</p>
            <p>Portal access is separate from submitter access and separate from admin roles.</p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
