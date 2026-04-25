import type { Metadata } from "next"
import { PageShell } from "@/lib/components/atlas"
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
          <div className="card">Only super_admin can manage roles.</div>
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
      <section className="shell pb-16">
        <div className="grid gap-3">
          {users.map((u) => (
            <form key={u.id} action={setUserRoles} className="card">
              <input type="hidden" name="userId" value={u.id} />
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="body-sm mono">{u.email}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  {ROLES.map((r) => (
                    <label key={r.value} className="flex items-center gap-2">
                      <input type="checkbox" name="roles" value={r.value} defaultChecked={u.roles.includes(r.value)} />
                      {r.label}
                    </label>
                  ))}
                </div>
                <button className="btn btn-secondary btn-sm">Save</button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
