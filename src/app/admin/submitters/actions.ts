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

export async function decideSubmitterAccess(formData: FormData): Promise<void> {
  const me = await requireAdmin()
  const parsed = Schema.parse({
    id: formData.get("id"),
    decision: formData.get("decision"),
    note: formData.get("note") || undefined,
  })
  const reqs = await readAll("submitter_access_requests")
  const r = reqs.find((x) => x.id === parsed.id)
  if (!r) return
  await upsert("submitter_access_requests", {
    ...r,
    status: parsed.decision,
    reviewedBy: me.id,
    reviewedAt: now(),
    reviewNote: parsed.note,
  })
  const users = await readAll("users")
  const u = users.find((x) => x.id === r.userId)
  if (u) {
    await upsert("users", {
      ...u,
      submitterAccess: parsed.decision === "approved" ? "approved" : "denied",
      submitterApprovedBy: parsed.decision === "approved" ? me.id : u.submitterApprovedBy,
      submitterApprovedAt: parsed.decision === "approved" ? now() : u.submitterApprovedAt,
      updatedAt: now(),
    })
    await notify(u.id, "submitter_access_decided",
      parsed.decision === "approved" ? "Submitter access approved" : "Submitter access declined",
      { href: "/portal", body: parsed.note })
  }
  revalidatePath("/admin/submitters")
}

export async function revokeSubmitterAccess(formData: FormData): Promise<void> {
  await requireAdmin()
  const userId = String(formData.get("userId") ?? "")
  if (!userId) return
  const users = await readAll("users")
  const u = users.find((x) => x.id === userId)
  if (!u) return
  await upsert("users", { ...u, submitterAccess: "revoked", updatedAt: now() })
  await notify(u.id, "submitter_access_decided", "Submitter access revoked")
  revalidatePath("/admin/submitters")
}