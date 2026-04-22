"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { readAll, upsert, now } from "@/lib/hub/store"
import { requireAdmin, canReviewEvents } from "@/lib/hub/auth"
import { notify } from "@/lib/hub/notifications"
import type { HubEvent } from "@/lib/hub/types"

async function assertReviewer() {
  const me = await requireAdmin()
  if (!canReviewEvents(me)) throw new Error("Not allowed")
  return me
}

const DecisionSchema = z.object({
  id: z.string().min(1),
  decision: z.enum(["approved", "rejected", "archived", "pending"]),
  note: z.string().trim().max(2000).optional(),
  unlock: z.enum(["on", "off"]).optional(),
})

export async function decideEvent(formData: FormData): Promise<void> {
  const me = await assertReviewer()
  const parsed = DecisionSchema.parse({
    id: formData.get("id"),
    decision: formData.get("decision"),
    note: formData.get("note") || undefined,
    unlock: formData.get("unlock") ? "on" : "off",
  })
  const events = await readAll("events")
  const existing = events.find((e) => e.id === parsed.id)
  if (!existing) return

  const isDecision = parsed.decision === "approved" || parsed.decision === "rejected" || parsed.decision === "archived"
  const updated: HubEvent = {
    ...existing,
    status: parsed.decision,
    reviewedBy: isDecision ? me.id : existing.reviewedBy,
    reviewedAt: isDecision ? now() : existing.reviewedAt,
    reviewNote: parsed.note ?? existing.reviewNote,
    locked: parsed.unlock === "on" ? false : isDecision ? true : existing.locked,
    updatedAt: now(),
  }
  await upsert("events", updated)

  if (parsed.decision === "approved") {
    await notify(existing.submitterUserId, "event_approved", `Your event was approved: ${existing.title}`, {
      href: "/portal/my-submissions",
    })
  } else if (parsed.decision === "rejected") {
    await notify(existing.submitterUserId, "event_rejected", `Your event was not approved: ${existing.title}`, {
      href: "/portal/my-submissions",
      body: parsed.note,
    })
  }

  revalidatePath("/admin/events")
  revalidatePath(`/admin/events/${parsed.id}`)
  revalidatePath("/events")
  revalidatePath("/events/archive")
  revalidatePath("/portal/my-submissions")
}

const EditSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(2),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).optional(),
  time: z.string().trim().optional(),
  regionId: z.string().min(1),
  city: z.string().trim().min(1),
  state: z.string().trim().optional(),
  venue: z.string().trim().min(1),
  hostCommittee: z.string().trim().min(1),
  registrationUrl: z.union([z.literal(""), z.url()]).optional(),
  chairPitch: z.string().trim().optional(),
})

export async function editEvent(formData: FormData): Promise<void> {
  await assertReviewer()
  const parsed = EditSchema.parse({
    id: formData.get("id"),
    title: formData.get("title"),
    date: formData.get("date"),
    endDate: formData.get("endDate") ?? "",
    time: formData.get("time") || undefined,
    regionId: formData.get("regionId"),
    city: formData.get("city"),
    state: formData.get("state") || undefined,
    venue: formData.get("venue"),
    hostCommittee: formData.get("hostCommittee"),
    registrationUrl: formData.get("registrationUrl") ?? "",
    chairPitch: formData.get("chairPitch") || undefined,
  })
  const events = await readAll("events")
  const existing = events.find((e) => e.id === parsed.id)
  if (!existing) return
  const updated: HubEvent = {
    ...existing,
    ...parsed,
    endDate: parsed.endDate || undefined,
    registrationUrl: parsed.registrationUrl || undefined,
    updatedAt: now(),
  }
  await upsert("events", updated)
  revalidatePath("/admin/events")
  revalidatePath(`/admin/events/${parsed.id}`)
  revalidatePath("/events")
}