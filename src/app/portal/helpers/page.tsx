import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = { title: "Helpers" }
export const dynamic = "force-dynamic"

export default async function HelpersRedirect() {
  // The helper list is a view of the directory.
  redirect("/portal/directory?list=helper")
  return <PortalHeader kicker="Helpers" title="Loading…" subtitle="" />
}