import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  LedgerRow,
  LedgerRows,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"
import { requireAdmin } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"

export const metadata: Metadata = {
  title: "Admin",
  description: "Review, approve, edit: HUBYPAA moderation and operations.",
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const me = await requireAdmin()
  const [events, portalReqs, submitterReqs, directory, subs] = await Promise.all([
    readAll("events"),
    readAll("portal_access_requests"),
    readAll("submitter_access_requests"),
    readAll("directory_contacts"),
    readAll("newsletter_subscribers"),
  ])

  const pendingEvents = events.filter((event) => event.status === "pending").length
  const pendingPortal = portalReqs.filter((request) => request.status === "pending").length
  const pendingSubmitter = submitterReqs.filter((request) => request.status === "pending").length
  const pendingDirectory = directory.filter((contact) => contact.status === "pending").length

  return (
    <PageShell tone="admin">
      <div className="flex flex-col gap-8">
        <section className="celestial-hero star-field star-field--sparse">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Admin"
              title={
                <span className="float-text">
                  Command center.
                  <br />
                  <em>Nothing is vague. Nothing is lost.</em>
                </span>
              }
              lead={`Signed in as ${me.name}. Review submissions, approve access, manage the directory, and keep the newsletter moving.`}
            />
          </div>
        </section>

        <div className="shell flex flex-col gap-8">
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="page-kicker">Queues</p>
                <h2 className="heading-lg">Primary work areas.</h2>
              </div>
              <ActionStrip>
                <Link href="/admin/events" className="btn btn--primary">
                  Review events
                </Link>
              </ActionStrip>
            </div>

            <LedgerRows>
              <LedgerRow
                href="/admin/events"
                label="Events"
                title={`${pendingEvents} pending · ${events.length} total`}
                summary="Review submissions, approve, reject, edit, and archive."
                meta="Open queue"
              />
              <LedgerRow
                href="/admin/access"
                label="Portal access"
                title={`${pendingPortal} pending · ${portalReqs.length} total`}
                summary="Manual access requests awaiting review."
                meta="Open queue"
              />
              <LedgerRow
                href="/admin/submitters"
                label="Submitter access"
                title={`${pendingSubmitter} pending · ${submitterReqs.length} total`}
                summary="Trusted-servant submitter applications."
                meta="Open queue"
              />
              <LedgerRow
                href="/admin/directory"
                label="Directory"
                title={`${pendingDirectory} pending · ${directory.length} total`}
                summary="Approve contacts, purge stale records, and manage list visibility."
                meta="Open queue"
              />
              <LedgerRow
                href="/admin/newsletter"
                label="Newsletter"
                title={`${subs.length} subscribers`}
                summary="Subscriber list, draft workflow, and send-state management."
                meta="Open tools"
              />
              <LedgerRow
                href="/admin/regions"
                label="Regions and roles"
                title="Keep the atlas structure clean."
                summary="Region rows, permission assignments, and admin-only controls."
                meta="Open settings"
                actions={
                  <ActionStrip>
                    <Link href="/admin/regions" className="btn btn--secondary btn-sm">
                      Regions
                    </Link>
                    <Link href="/admin/roles" className="btn btn--ghost btn-sm">
                      Roles
                    </Link>
                  </ActionStrip>
                }
              />
            </LedgerRows>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
