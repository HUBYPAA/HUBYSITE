import type { Metadata } from "next"
import { MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { getRegions } from "@/lib/hub/queries"
import { saveProfile } from "./actions"
import { ProfileForm } from "./form"

export const metadata: Metadata = { title: "Profile & consent" }
export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const user = await requirePortalAccess()
  const [contacts, regions] = await Promise.all([
    readAll("directory_contacts"),
    getRegions({ activeOnly: true }),
  ])
  const existing = contacts.find((c) => c.userId === user.id)

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Profile"
        title="Your listing and consent."
        subtitle="Admins approve directory listings. You control consent for staying on helper/past lists after your term ends."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <Surface className="grid gap-6">
          <div>
            <p className="page-kicker">Consent and contact</p>
            <h2 className="heading-lg">Account plumbing, kept handsome.</h2>
          </div>
          <p className="body-sm" style={{ margin: 0 }}>
            HUBYPAA keeps no home address, sobriety date, employer, or other
            personal data. We only use what&rsquo;s on this form, and only
            inside the private portal.
          </p>
          <ProfileForm
            action={saveProfile}
            regions={regions}
            defaults={{
              name: existing?.name ?? user.name,
              committee: existing?.committee ?? "",
              role: existing?.role ?? "",
              regionId: existing?.regionId,
              email: existing?.email ?? user.email,
              phone: existing?.phone,
              yearsServed: existing?.yearsServed,
              willingToHelpWith: existing?.willingToHelpWith,
              termEndsAt: existing?.termEndsAt,
              consentRemainAfterTerm: existing?.consentRemainAfterTerm ?? false,
              consentHelperList: existing?.consentHelperList ?? false,
              consentPastList: existing?.consentPastList ?? false,
            }}
            status={existing?.status}
          />
        </Surface>

        <div className="grid gap-4">
          <Surface tone="quiet">
            <StatusRail
              steps={[
                {
                  label: "Profile saved",
                  detail: "Your directory listing stays attached to your account record.",
                  state: existing ? "complete" : "current",
                },
                {
                  label: "Human review",
                  detail: "Directory listings are approved manually before they appear to other portal users.",
                  state: existing?.status === "approved" ? "complete" : "current",
                },
                {
                  label: existing?.status === "approved" ? "Approved listing" : "Consent controls",
                  detail: existing?.status === "approved"
                    ? "Your current listing is visible according to your chosen lists."
                    : "You control helper and past-chair visibility from this page.",
                  state: existing?.status === "approved" ? "complete" : "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Privacy" title="What stays off the map">
            <p>We do not ask for home address, employer, or sobriety date here.</p>
            <p>
              If you do not consent to remain after your term ends, the record
              is purged automatically after the end date you provide.
            </p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
