"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { notify } from "@/lib/hub/notifications"
import type { SubmitterAccessRequest } from "@/lib/hub/types"

const Schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.email().trim(),
  committee: z.string().trim().min(2).max(200),
  position: z.string().trim().min(2).max(200),
  note: z.string().trim().max(2000).optional(),
})

export type State = { success: boolean; message: string; errors?: Record<string, string> }

export async function requestSubmitterAccess(_prev: State, formData: FormData): Promise<State> {
  const user = await requirePortalAccess()

  const parsed = Schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    committee: formData.get("committee"),
    position: formData.get("position"),
    note: formData.get("note") || undefined,
  })
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const iss of parsed.error.issues) errors[iss.path[0] as string] = iss.message
    return { success: false, message: "Fix the highlighted fields.", errors }
  }

  const existing = await readAll("submitter_access_requests")
  if (existing.find((r) => r.userId === user.id && r.status === "pending")) {
    redirect("/portal/submitter-access")
  }

  const record: SubmitterAccessRequest = {
    id: newId(),
    userId: user.id,
    name: parsed.data.name,
    email: parsed.data.email,
    committee: parsed.data.committee,
    position: parsed.data.position,
    note: parsed.data.note,
    status: "pending",
    createdAt: now(),
  }
  await upsert("submitter_access_requests", record)

  const users = await readAll("users")
  const u = users.find((x) => x.id === user.id)
  if (u && u.submitterAccess !== "approved") {
    await upsert("users", { ...u, submitterAccess: "pending", updatedAt: now() })
  }

  await notify("admins", "submitter_access_requested", `${user.name} requested submitter access`, {
    href: "/admin/submitters",
    body: `${parsed.data.position} · ${parsed.data.committee}`,
    meta: { requestId: record.id, userId: user.id },
  })

  redirect("/portal/submitter-access")
}