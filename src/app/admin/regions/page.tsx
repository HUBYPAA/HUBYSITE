import type { Metadata } from "next"
import { PageShell } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireAdmin } from "@/lib/hub/auth"
import { getRegions } from "@/lib/hub/queries"
import { createRegion, updateRegion } from "./actions"

export const metadata: Metadata = { title: "Admin · Regions" }
export const dynamic = "force-dynamic"

export default async function AdminRegionsPage() {
  await requireAdmin()
  const regions = await getRegions()

  return (
    <PageShell tone="admin">
      <PortalHeader
        kicker="Admin · Regions"
        title="Manage regions."
        subtitle="Rename, reorder, deactivate. Regions drive event grouping and newsletter preferences."
      />

      <section className="shell pb-10">
        <form action={createRegion} className="card grid gap-3 sm:grid-cols-[1fr_220px_140px_auto]">
          <input name="label" required placeholder="New region label" className="input" />
          <input name="slug" placeholder="slug (optional)" className="input" />
          <input name="sortOrder" type="number" defaultValue={100} className="input" />
          <button className="btn btn-amber">Add</button>
        </form>
      </section>

      <section className="shell pb-16">
        <div className="grid gap-2">
          {regions.map((r) => (
            <form key={r.id} action={updateRegion} className="card card-quiet grid gap-3 sm:grid-cols-[1fr_120px_160px_auto]">
              <input type="hidden" name="id" value={r.id} />
              <input name="label" defaultValue={r.label} className="input" />
              <input name="sortOrder" type="number" defaultValue={r.sortOrder} className="input" />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="active" defaultChecked={r.active} /> active
                <span className="caption mono ml-auto">{r.slug}</span>
              </label>
              <button className="btn btn-secondary btn-sm">Save</button>
            </form>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
