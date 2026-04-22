import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { getCurrentUser, hasPortalAccess, canSubmitEvents, isAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = { title: "Portal" }
export const dynamic = "force-dynamic"

export default async function PortalPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/sign-in?next=/portal")
  if (!hasPortalAccess(user)) redirect("/portal/waitlist")

  const events = await readAll("events")
  const mine = events.filter((e) => e.submitterUserId === user.id)
  const pendingMine = mine.filter((e) => e.status === "pending").length

  return (
    <>
      <PortalHeader
        kicker={`Signed in as ${user.name}`}
        title="Welcome back."
        subtitle="Everything in the portal stays here. None of this is public unless explicitly approved and published."
      />

      <section className="shell pb-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Tile
            label="submit"
            title={canSubmitEvents(user) ? "Submit an event" : "Request submitter access"}
            body={
              canSubmitEvents(user)
                ? "Add a new event for admin review. You can edit it until it's reviewed."
                : "Event submission is limited to approved trusted servants. Ask for access — a human will review."
            }
            href={canSubmitEvents(user) ? "/portal/submit-event" : "/portal/submitter-access"}
            cta={canSubmitEvents(user) ? "New submission" : "Request access"}
          />
          <Tile
            label="my work"
            title="My submissions"
            body={
              pendingMine > 0
                ? `${pendingMine} pending review. Editable until reviewed.`
                : "Everything you've sent in, with its current review status."
            }
            href="/portal/my-submissions"
            cta="Open submissions"
          />
          <Tile
            label="directory"
            title="Private directory"
            body="Current chairs, board members, and ESH helpers. Approved users only."
            href="/portal/directory"
            cta="Open directory"
          />
          <Tile
            label="helpers"
            title="Experience, strength, and hope"
            body="People who have opted in to be reached for help — 12-step calls, committee advice, newcomer conversations."
            href="/portal/helpers"
            cta="See helpers"
          />
          <Tile
            label="profile"
            title="My profile & consent"
            body="Update your availability, helper opt-in, and term information."
            href="/portal/profile"
            cta="Edit profile"
          />
          {isAdmin(user) ? (
            <Tile
              label="admin"
              title="Admin dashboard"
              body="Review submissions, manage subscribers, approve directory members, and edit regions."
              href="/admin"
              cta="Open admin"
            />
          ) : null}
        </div>
      </section>
    </>
  )
}

function Tile({
  label, title, body, href, cta,
}: { label: string; title: string; body: string; href: string; cta: string }) {
  return (
    <Link href={href} className="card card-interactive card-glow group block">
      <p className="label mono">{label}</p>
      <h3 className="heading-lg mt-3">{title}</h3>
      <p className="body-sm mt-3">{body}</p>
      <p
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "var(--color-accent-bright)" }}
      >
        {cta} →
      </p>
    </Link>
  )
}