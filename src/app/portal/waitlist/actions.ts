"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { getCurrentUser } from "@/lib/hub/auth"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { notify } from "@/lib/hub/notifications"
import type { PortalAccessRequest } from "@/lib/hub/types"

const Schema = z.object({
  committee: z.string().trim().min(2).max(200),
  position: z.string().trim().min(2).max(200),
  reason: z.string().trim().max(2000).optional(),
})

export type WaitlistState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export async function requestPortalAccess(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, message: "Please sign in first." }
  }

  const parsed = Schema.safeParse({
    committee: formData.get("committee"),
    position: formData.get("position"),
    reason: formData.get("reason") || undefined,
  })
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const iss of parsed.error.issues) errors[iss.path[0] as string] = iss.message
    return { success: false, message: "Fix the highlighted fields.", errors }
  }

  const existing = await readAll("portal_access_requests")
  const already = existing.find((r) => r.userId === user.id && r.status === "pending")
  if (already) {
    redirect("/portal/waitlist")
  }

  const record: PortalAccessRequest = {
    id: newId(),
    userId: user.id,
    committee: parsed.data.committee,
    position: parsed.data.position,
    reason: parsed.data.reason,
    status: "pending",
    createdAt: now(),
  }
  await upsert("portal_access_requests", record)

  // Flip user to pending portal access.
  const users = await readAll("users")
  const u = users.find((x) => x.id === user.id)
  if (u && u.portalAccess !== "approved") {
    await upsert("users", { ...u, portalAccess: "pending", updatedAt: now() })
  }

  await notify("admins", "portal_access_requested", `${user.name} requested portal access`, {
    href: "/admin/access",
    body: `${parsed.data.position} · ${parsed.data.committee}`,
    meta: { requestId: record.id, userId: user.id },
  })

  redirect("/portal/waitlist")
}