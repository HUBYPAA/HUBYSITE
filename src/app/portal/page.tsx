import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser, hasPortalAccess, canSubmitEvents, isAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { RunningHead } from "@/lib/components/ornament"

export const metadata: Metadata = { 
  title: "Portal",
  description: "Private portal for HUBYPAA helpers, submitters, and administrators.",
}

export const dynamic = "force-dynamic"

export default async function PortalPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/sign-in?next=/portal")
  if (!hasPortalAccess(user)) redirect("/portal/waitlist")

  const events = await readAll("events")
  const mine = events.filter((e) => e.submitterUserId === user.id)
  const pendingMine = mine.filter((e) => e.status === "pending").length

  return (
    <section className="shell" aria-labelledby="portal-title">
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">Portal</span>}
          center={<span>Signed in as {user.name}</span>}
        />
        <h1 id="portal-title" className="section-head">
          Everything here stays here.{" "}
          <em>None of it is public unless explicitly approved.</em>
        </h1>
        <p className="lede max-w-2xl">
          This is the back office — submissions, directory management,
          and helper coordination. Nothing here shows up on the main site
          without review.
        </p>
      </header>

      <section className="section section--tight">
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
    </section>
  )
}

function Tile({
  label, title, body, href, cta,
}: { label: string; title: string; body: string; href: string; cta: string }) {
  return (
    <Link href={href} className="card group block">
      <p className="text-xs uppercase tracking-widest text-gilt-600">{label}</p>
      <h3 className="mt-3 font-serif text-xl tracking-tight text-ink group-hover:text-accent transition-colors">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-stone-700">{body}</p>
      <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        {cta} →
      </p>
    </Link>
  )
}
