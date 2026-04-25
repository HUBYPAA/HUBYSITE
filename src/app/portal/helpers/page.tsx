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
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = { title: "Helpers" }
export const dynamic = "force-dynamic"

export default async function HelpersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; region?: string }>
}) {
  await requirePortalAccess()
  await applyDirectoryLifecycle()

  const [contacts, regions, { q, region }] = await Promise.all([
    readAll("directory_contacts"),
    readAll("regions"),
    searchParams,
  ])

  const regionMap = new Map(regions.map((item) => [item.id, item]))
  const qLower = (q ?? "").toLowerCase().trim()
  const regionFilter = region ?? ""

  const helpers = contacts.filter(
    (contact) =>
      contact.status === "approved" &&
      contact.listings.includes("helper") &&
      (!regionFilter || contact.regionId === regionFilter) &&
      (!qLower ||
        contact.name.toLowerCase().includes(qLower) ||
        contact.committee.toLowerCase().includes(qLower) ||
        contact.role.toLowerCase().includes(qLower) ||
        (contact.willingToHelpWith ?? "").toLowerCase().includes(qLower)),
  )

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Helpers"
        title="Experience, strength, and hope."
        subtitle="People in this list opted in to be reachable for advice, newcomer calls, and service support."
      />

      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
        <div className="grid gap-4">
          <Surface className="grid gap-4">
            <div>
              <p className="page-kicker">Helper search</p>
              <h2 className="heading-lg">Find someone who said yes.</h2>
            </div>
            <form method="get" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
              <input
                name="q"
                defaultValue={q ?? ""}
                className="input"
                placeholder="Search name, role, committee, or help note"
              />
              <select name="region" defaultValue={regionFilter} className="input">
                <option value="">All regions</option>
                {regions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn--secondary">
                Filter
              </button>
            </form>
            <p className="body-sm" style={{ margin: 0 }}>
              {helpers.length} helpers currently visible.
            </p>
          </Surface>

          {helpers.length === 0 ? (
            <Surface tone="quiet">
              <p className="body-sm" style={{ margin: 0 }}>
                No helpers match that search yet.
              </p>
            </Surface>
          ) : (
            <LedgerRows>
              {helpers.map((contact) => (
                <LedgerRow
                  key={contact.id}
                  label={[contact.role, contact.committee].filter(Boolean).join(" · ")}
                  title={contact.name}
                  summary={[
                    regionMap.get(contact.regionId ?? "")?.label,
                    contact.email,
                    contact.phone,
                    contact.willingToHelpWith,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                  meta="Helper"
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
                  tone="quiet"
                />
              ))}
            </LedgerRows>
          )}
        </div>

        <div className="grid gap-4">
          <MarginalRail kicker="Consent" title="This list is opt-in">
            <p>Everyone here explicitly chose to be reachable from inside the portal.</p>
            <p>Use the list for service support, newcomer help, and practical follow-up. Not for spam.</p>
          </MarginalRail>
          <Surface tone="quiet" className="grid gap-4">
            <div>
              <p className="page-kicker">Offer help</p>
              <h2 className="heading-lg">Want to be reachable too?</h2>
            </div>
            <p className="body-sm" style={{ margin: 0 }}>
              Update your profile and opt into the helper list. Admin approval
              still controls directory visibility.
            </p>
            <ActionStrip>
              <Link href="/portal/profile" className="btn btn--primary btn-sm">
                Update profile
              </Link>
              <Link href="/portal/directory?list=helper" className="btn btn--ghost btn-sm">
                Open directory view
              </Link>
            </ActionStrip>
          </Surface>
        </div>
      </section>
    </PageShell>
  )
}
