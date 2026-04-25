import type { Metadata } from "next"
import { PageShell } from "@/lib/components/atlas"
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
      <section className="shell pb-10">
        <h2 className="display-2 mb-4">Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="card card-quiet body-sm">No pending requests.</p>
        ) : (
          <div className="grid gap-3">
            {pending.map((r) => {
              const u = userMap.get(r.userId)
              return (
                <form key={r.id} action={decidePortalAccess} className="card">
                  <input type="hidden" name="id" value={r.id} />
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{u?.name ?? "—"}</p>
                      <p className="body-sm mono">{u?.email ?? "—"}</p>
                      <p className="body-sm mt-2">{r.position} · {r.committee}</p>
                      {r.reason ? <p className="body-sm mt-2 italic">&ldquo;{r.reason}&rdquo;</p> : null}
                    </div>
                  </div>
                  <textarea name="note" className="input textarea mt-3" placeholder="Optional note" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button name="decision" value="approved" className="btn btn-amber btn-sm">Approve</button>
                    <button name="decision" value="denied" className="btn btn-secondary btn-sm">Deny</button>
                  </div>
                </form>
              )
            })}
          </div>
        )}
      </section>

      <section className="shell pb-16">
        <h2 className="display-2 mb-4">Approved users ({approvedUsers.length})</h2>
        <div className="grid gap-2">
          {approvedUsers.map((u) => (
            <form key={u.id} action={revokePortalAccess} className="card card-quiet flex flex-wrap items-center gap-3">
              <input type="hidden" name="userId" value={u.id} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{u.name}</p>
                <p className="body-sm mono">{u.email}</p>
                <p className="caption mt-1">Roles: {u.roles.length ? u.roles.join(", ") : "none"}</p>
              </div>
              <button className="btn btn-secondary btn-sm">Revoke</button>
            </form>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
