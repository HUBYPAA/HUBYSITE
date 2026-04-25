import type { Metadata } from "next"
import { LedgerRow, LedgerRows, MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
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
    <PageShell tone="admin">
      <PortalHeader
        kicker="Admin · Submitters"
        title="Trusted-servant submitter access."
        subtitle="Only approved submitters can send events in. Submissions still require review."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)]">
        <div className="grid gap-5">
          <Surface className="grid gap-4">
            <div>
              <p className="page-kicker">Pending submitter requests</p>
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
                    <Surface key={r.id} className="grid gap-4">
                      <form action={decideSubmitterAccess} className="grid gap-4">
                        <input type="hidden" name="id" value={r.id} />
                        <div className="min-w-0">
                          <p className="page-kicker">Requested {r.createdAt.slice(0, 10)}</p>
                          <h3 className="heading-md">{r.name}</h3>
                          <p className="body-sm mono" style={{ margin: "0.35rem 0 0" }}>
                            {r.email}
                          </p>
                          <p className="body-sm" style={{ margin: "0.75rem 0 0" }}>
                            {r.position} · {r.committee}
                          </p>
                          {r.note ? (
                            <p className="body-sm italic" style={{ margin: "0.75rem 0 0" }}>
                              &ldquo;{r.note}&rdquo;
                            </p>
                          ) : null}
                          <p className="caption" style={{ marginTop: "0.75rem" }}>
                            Signed-in email: {u?.email ?? "—"}
                          </p>
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
              <p className="page-kicker">Approved submitters</p>
              <h2 className="heading-lg">{approvedUsers.length} can send events.</h2>
            </div>
            {approvedUsers.length === 0 ? (
              <p className="body-sm" style={{ margin: 0 }}>
                No approved submitters yet.
              </p>
            ) : (
              <LedgerRows>
                {approvedUsers.map((u) => (
                  <LedgerRow
                    key={u.id}
                    label="Approved"
                    title={u.name}
                    summary={<span className="mono">{u.email}</span>}
                    meta="Submitter"
                    actions={
                      <form action={revokeSubmitterAccess}>
                        <input type="hidden" name="userId" value={u.id} />
                        <button className="btn btn-secondary btn-sm">Revoke</button>
                      </form>
                    }

                  />
                ))}
              </LedgerRows>
            )}
          </Surface>
        </div>

        <div className="grid gap-4">
          <Surface>
            <StatusRail
              steps={[
                {
                  label: "Request sent",
                  detail: "A portal user asks to submit events on behalf of a committee or conference.",
                  state: pending.length > 0 ? "complete" : "current",
                },
                {
                  label: "Human review",
                  detail: "Admins confirm the role is real and active.",
                  state: "current",
                },
                {
                  label: "Approved or denied",
                  detail: "Approval grants intake access. Public posting still requires event review.",
                  state: "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Boundary" title="What approval means">
            <p>Submitter access opens the event intake form. It does not approve an event automatically.</p>
            <p>Only current trusted servants should be approved here.</p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
