import type { Metadata } from "next"
import { MarginalRail, PageShell, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin, hasRole } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { setUserRoles } from "./actions"
import type { HubRole } from "@/lib/hub/types"

export const metadata: Metadata = { title: "Admin · Roles" }
export const dynamic = "force-dynamic"

const ROLES: { value: HubRole; label: string }[] = [
  { value: "events_admin",     label: "Events admin" },
  { value: "newsletter_admin", label: "Newsletter admin" },
  { value: "directory_admin",  label: "Directory admin" },
  { value: "super_admin",      label: "Super admin" },
]

export default async function AdminRolesPage() {
  const me = await requireAdmin()
  if (!hasRole(me, "super_admin")) {
    return (
      <PageShell tone="admin">
        <section className="shell">
          <Surface tone="quiet">Only super_admin can manage roles.</Surface>
        </section>
      </PageShell>
    )
  }
  const users = (await readAll("users")).filter((u) => u.portalAccess === "approved" || u.roles.length > 0)

  return (
    <PageShell tone="admin">
      <PortalHeader
        kicker="Admin · Roles"
        title="Assign admin roles."
        subtitle="Roles gate which admin pages a user can use. super_admin can do everything."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
        <div className="grid gap-3">
          {users.map((u) => (
            <Surface key={u.id}>
              <form action={setUserRoles} className="grid gap-4">
                <input type="hidden" name="userId" value={u.id} />
                <div className="min-w-0">
                  <p className="page-kicker">Role assignment</p>
                  <h2 className="heading-md">{u.name}</h2>
                  <p className="body-sm mono" style={{ margin: "0.35rem 0 0" }}>
                    {u.email}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  {ROLES.map((r) => (
                    <label key={r.value} className="flex items-center gap-2">
                      <input type="checkbox" name="roles" value={r.value} defaultChecked={u.roles.includes(r.value)} />
                      {r.label}
                    </label>
                  ))}
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-secondary btn-sm">Save</button>
                </div>
              </form>
            </Surface>
          ))}
        </div>

        <MarginalRail kicker="Hierarchy" title="Role meanings">
          <p>`events_admin` reviews the event queue. `newsletter_admin` manages drafts and subscribers.</p>
          <p>`directory_admin` manages private contacts. `super_admin` can grant and revoke the others.</p>
        </MarginalRail>
      </section>
    </PageShell>
  )
}
