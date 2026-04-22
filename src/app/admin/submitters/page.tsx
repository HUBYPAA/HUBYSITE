import type { Metadata } from "next"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { decideSubmitterAccess, revokeSubmitterAccess } from "./actions"

export const metadata: Metadata = { title: "Admin · Submitters" }
export const dynamic = "force-dynamic"

export default async function AdminSubmittersPage() {
  await requireAdmin()
  const [reqs, users] = await Promise.all([
    readAll("submitter_access_requests"),
    readAll("users"),
  ])
  const userMap = new Map(users.map((u) => [u.id, u]))
  const pending = reqs.filter((r) => r.status === "pending")
  const approvedUsers = users.filter((u) => u.submitterAccess === "approved")

  return (
    <>
      <PortalHeader
        kicker="Admin · Submitters"
        title="Trusted-servant submitter access."
        subtitle="Only approved submitters can send events in. Submissions still require review."
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
                <form key={r.id} action={decideSubmitterAccess} className="card">
                  <input type="hidden" name="id" value={r.id} />
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="body-sm mono">{r.email}</p>
                  <p className="body-sm mt-2">{r.position} · {r.committee}</p>
                  {r.note ? <p className="body-sm mt-2 italic">&ldquo;{r.note}&rdquo;</p> : null}
                  <p className="caption mt-2">Signed-in email: {u?.email}</p>
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
        <h2 className="display-2 mb-4">Approved submitters ({approvedUsers.length})</h2>
        <div className="grid gap-2">
          {approvedUsers.map((u) => (
            <form key={u.id} action={revokeSubmitterAccess} className="card card-quiet flex flex-wrap items-center gap-3">
              <input type="hidden" name="userId" value={u.id} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{u.name}</p>
                <p className="body-sm mono">{u.email}</p>
              </div>
              <button className="btn btn-secondary btn-sm">Revoke</button>
            </form>
          ))}
        </div>
      </section>
    </>
  )
}