"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { readAll, upsert, now } from "@/lib/hub/store"
import { requireAdmin } from "@/lib/hub/auth"
import { notify } from "@/lib/hub/notifications"

const Schema = z.object({
  id: z.string().min(1),
  decision: z.enum(["approved", "denied"]),
  note: z.string().trim().max(2000).optional(),
})

export async function decidePortalAccess(formData: FormData): Promise<void> {
  const me = await requireAdmin()
  const parsed = Schema.parse({
    id: formData.get("id"),
    decision: formData.get("decision"),
    note: formData.get("note") || undefined,
  })

  const reqs = await readAll("portal_access_requests")
  const existing = reqs.find((r) => r.id === parsed.id)
  if (!existing) return
  await upsert("portal_access_requests", {
    ...existing,
    status: parsed.decision,
    reviewedBy: me.id,
    reviewedAt: now(),
    reviewNote: parsed.note,
  })

  const users = await readAll("users")
  const u = users.find((x) => x.id === existing.userId)
  if (u) {
    await upsert("users", {
      ...u,
      portalAccess: parsed.decision === "approved" ? "approved" : "denied",
      portalApprovedBy: parsed.decision === "approved" ? me.id : u.portalApprovedBy,
      portalApprovedAt: parsed.decision === "approved" ? now() : u.portalApprovedAt,
      updatedAt: now(),
    })
    await notify(u.id, "portal_access_decided",
      parsed.decision === "approved" ? "Portal access approved" : "Portal access declined",
      { href: "/portal", body: parsed.note })
  }

  revalidatePath("/admin/access")
}

export async function revokePortalAccess(formData: FormData): Promise<void> {
  const me = await requireAdmin()
  const userId = String(formData.get("userId") ?? "")
  if (!userId) return
  const users = await readAll("users")
  const u = users.find((x) => x.id === userId)
  if (!u) return
  await upsert("users", { ...u, portalAccess: "revoked", updatedAt: now() })
  await notify(u.id, "portal_access_decided", "Portal access revoked", {
    body: `By ${me.email}`,
  })
  revalidatePath("/admin/access")
}