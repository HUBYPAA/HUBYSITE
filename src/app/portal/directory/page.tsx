import type { Metadata } from "next"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { applyDirectoryLifecycle } from "@/lib/hub/lifecycle"
import type { DirectoryContact } from "@/lib/hub/types"
import { PortalSubnav } from "@/lib/hub/portal-layout"

export const metadata: Metadata = { title: "Directory" }
export const dynamic = "force-dynamic"

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; list?: string }>
}) {
  await requirePortalAccess()
  await applyDirectoryLifecycle()

  const [contacts, regions] = await Promise.all([
    readAll("directory_contacts"),
    readAll("regions"),
  ])
  const regionMap = new Map(regions.map((r) => [r.id, r]))
  const { q, list } = await searchParams

  const activeList = (list ?? "current") as DirectoryContact["listings"][number]
  const approved = contacts.filter((c) => c.status === "approved" && c.listings.includes(activeList))
  const qLower = (q ?? "").toLowerCase().trim()
  const filtered = qLower
    ? approved.filter(
        (c) =>
          c.name.toLowerCase().includes(qLower) ||
          c.committee.toLowerCase().includes(qLower) ||
          c.role.toLowerCase().includes(qLower),
      )
    : approved

  return (
    <>
      <PortalHeader
        kicker="Directory"
        title="Private contact directory."
        subtitle="Approved HUBYPAA team and current chairs only. Data you share here is consented, minimal, and purge-aware."
      />
      <PortalSubnav
        items={[
          { href: "/portal/directory?list=current", label: "Current",  active: activeList === "current" },
          { href: "/portal/directory?list=helper",  label: "Helpers",  active: activeList === "helper" },
          { href: "/portal/directory?list=past",    label: "Past",     active: activeList === "past" },
        ]}
      />

      <section className="shell pt-6 pb-16">
        <form method="get" className="mb-6 flex flex-wrap items-center gap-3">
          <input type="hidden" name="list" value={activeList} />
          <input name="q" defaultValue={q ?? ""} className="input max-w-xs" placeholder="Search name, committee, role" />
          <button type="submit" className="btn btn-secondary btn-sm">Search</button>
          <span className="body-sm ml-auto">{filtered.length} people</span>
        </form>

        {filtered.length === 0 ? (
          <p className="card card-quiet body-sm">No matching contacts in this list.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {filtered.map((c) => (
              <div key={c.id} className="card card-quiet">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">{c.name}</p>
                    <p className="body-sm">
                      {c.role} · {c.committee}
                    </p>
                  </div>
                  <p className="mono text-[10px] uppercase tracking-wider text-[var(--color-fg-3)]">
                    {c.regionId ? regionMap.get(c.regionId)?.label : ""}
                  </p>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    <span className="caption mr-2">Email</span>
                    <a href={`mailto:${c.email}`} className="underline">{c.email}</a>
                  </p>
                  {c.phone ? (
                    <p>
                      <span className="caption mr-2">Phone</span>
                      <a href={`tel:${c.phone}`} className="underline">{c.phone}</a>
                    </p>
                  ) : null}
                  {c.yearsServed ? (
                    <p><span className="caption mr-2">Years</span>{c.yearsServed}</p>
                  ) : null}
                  {c.willingToHelpWith ? (
                    <p className="mt-2 body-sm italic">&ldquo;{c.willingToHelpWith}&rdquo;</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}