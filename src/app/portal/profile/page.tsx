import type { Metadata } from "next"
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
    <>
      <PortalHeader
        kicker="Profile"
        title="Your listing and consent."
        subtitle="Admins approve directory listings. You control consent for staying on helper/past lists after your term ends."
      />
      <section className="shell">
        <div className="card">
          <p className="eyebrow">Consent</p>
          <p className="body-sm mt-3">
            HUBYPAA keeps no home address, sobriety date, employer, or other
            personal data. We only use what&rsquo;s on this form, and only
            inside the private portal.
          </p>
          <hr className="hr my-8" />
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
        </div>
      </section>
    </>
  )
}