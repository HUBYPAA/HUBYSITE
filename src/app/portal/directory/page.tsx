import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  LedgerRow,
  LedgerRows,
  MarginalRail,
  PageShell,
  Surface,
} from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { applyDirectoryLifecycle } from "@/lib/hub/lifecycle"
import { PortalSubnav } from "@/lib/hub/portal-layout"
import { readAll } from "@/lib/hub/store"
import type { DirectoryContact } from "@/lib/hub/types"

export const metadata: Metadata = { title: "Directory" }
export const dynamic = "force-dynamic"

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; list?: string }>
}) {
  await requirePortalAccess()
  await applyDirectoryLifecycle()

  const [contacts, regions, { q, list }] = await Promise.all([
    readAll("directory_contacts"),
    readAll("regions"),
    searchParams,
  ])

  const regionMap = new Map(regions.map((region) => [region.id, region]))
  const activeList = (list ?? "current") as DirectoryContact["listings"][number]
  const approved = contacts.filter(
    (contact) => contact.status === "approved" && contact.listings.includes(activeList),
  )

  const qLower = (q ?? "").toLowerCase().trim()
  const filtered = qLower
    ? approved.filter(
        (contact) =>
          contact.name.toLowerCase().includes(qLower) ||
          contact.committee.toLowerCase().includes(qLower) ||
          contact.role.toLowerCase().includes(qLower),
      )
    : approved

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Directory"
        title="Private contact directory."
        subtitle="Approved HUBYPAA team and current chairs only. Data here is consented, minimal, and purge-aware."
      />
      <PortalSubnav
        items={[
          { href: "/portal/directory?list=current", label: "Current", active: activeList === "current" },
          { href: "/portal/directory?list=helper", label: "Helpers", active: activeList === "helper" },
          { href: "/portal/directory?list=past", label: "Past", active: activeList === "past" },
        ]}
      />

      <section className="shell grid gap-5 pb-16 pt-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="grid gap-4">
          <Surface className="grid gap-4">
            <form method="get" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <input type="hidden" name="list" value={activeList} />
              <input
                name="q"
                defaultValue={q ?? ""}
                className="input"
                placeholder="Search name, committee, or role"
              />
              <button type="submit" className="btn btn--secondary">
                Search
              </button>
            </form>
            <p className="body-sm" style={{ margin: 0 }}>
              {filtered.length} people in this list.
            </p>
          </Surface>

          {filtered.length === 0 ? (
            <Surface>
              <p className="body-sm" style={{ margin: 0 }}>
                No matching contacts in this list.
              </p>
            </Surface>
          ) : (
            <LedgerRows>
              {filtered.map((contact) => (
                <LedgerRow
                  key={contact.id}
                  label={[contact.role, contact.committee].filter(Boolean).join(" · ")}
                  title={contact.name}
                  summary={[
                    regionMap.get(contact.regionId ?? "")?.label,
                    contact.email,
                    contact.phone,
                    contact.yearsServed,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  meta={activeList}
                  actions={
                    <ActionStrip>
                      <Link href={`mailto:${contact.email}`} className="btn btn--secondary btn-sm">
                        Email
                      </Link>
                      {contact.phone ? (
                        <Link href={`tel:${contact.phone}`} className="btn btn--ghost btn-sm">
                          Call
                        </Link>
                      ) : null}
                    </ActionStrip>
                  }

                />
              ))}
            </LedgerRows>
          )}
        </div>

        <MarginalRail kicker="Privacy" title="Consent and retention">
          <p style={{ margin: 0 }}>
            Only approved users can see this directory.
          </p>
          <p style={{ margin: 0 }}>
            Contacts can opt into helper and past-chair visibility, and records
            can be purged when consent or term status changes.
          </p>
        </MarginalRail>
      </section>
    </PageShell>
  )
}
