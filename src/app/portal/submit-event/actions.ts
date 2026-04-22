"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { requireSubmitter } from "@/lib/hub/auth"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { notify } from "@/lib/hub/notifications"
import { storeFlyer } from "@/lib/hub/uploads"
import type { HubEvent } from "@/lib/hub/types"

const Schema = z.object({
  title: z.string().trim().min(2).max(200),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).optional(),
  time: z.string().trim().max(80).optional(),
  regionId: z.string().min(1),
  city: z.string().trim().min(1).max(160),
  state: z.string().trim().max(120).optional(),
  venue: z.string().trim().min(1).max(240),
  hostCommittee: z.string().trim().min(1).max(240),
  registrationUrl: z.union([z.literal(""), z.url()]).optional(),
  chairPitch: z.string().trim().max(2000).optional(),
})

export type State = { success: boolean; message: string; errors?: Record<string, string>; createdId?: string }

const EMPTY: State = { success: false, message: "" }

export async function submitEvent(_prev: State, formData: FormData): Promise<State> {
  const user = await requireSubmitter()

  const parsed = Schema.safeParse({
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
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const iss of parsed.error.issues) errors[iss.path[0] as string] = iss.message
    return { ...EMPTY, message: "Please fix the highlighted fields.", errors }
  }

  // Validate region exists.
  const regions = await readAll("regions")
  if (!regions.find((r) => r.id === parsed.data.regionId)) {
    return { ...EMPTY, message: "Unknown region." }
  }

  // Flyer
  let flyerPath: string | undefined
  const flyerRaw = formData.get("flyer")
  if (flyerRaw instanceof File && flyerRaw.size > 0) {
    try {
      const stored = await storeFlyer(flyerRaw)
      flyerPath = stored.publicPath
    } catch (err) {
      return { ...EMPTY, message: err instanceof Error ? err.message : "Flyer upload failed." }
    }
  }

  const event: HubEvent = {
    id: newId(),
    title: parsed.data.title,
    date: parsed.data.date,
    endDate: parsed.data.endDate || undefined,
    time: parsed.data.time,
    regionId: parsed.data.regionId,
    city: parsed.data.city,
    state: parsed.data.state,
    venue: parsed.data.venue,
    hostCommittee: parsed.data.hostCommittee,
    registrationUrl: parsed.data.registrationUrl || undefined,
    flyerPath,
    chairPitch: parsed.data.chairPitch,
    submitterUserId: user.id,
    submitterName: user.name,
    submitterEmail: user.email,
    status: "pending",
    locked: false,
    createdAt: now(),
    updatedAt: now(),
  }
  await upsert("events", event)

  await notify("admins", "event_submitted", `New event: ${event.title}`, {
    href: `/admin/events/${event.id}`,
    body: `${event.hostCommittee} · ${event.city}${event.state ? ", " + event.state : ""}`,
    meta: { eventId: event.id, submitterUserId: user.id },
  })

  revalidatePath("/admin/events")
  revalidatePath("/portal/my-submissions")
  redirect(`/portal/my-submissions?created=${event.id}`)
}

// Edit own pending submission.
export async function updateOwnEvent(_prev: State, formData: FormData): Promise<State> {
  const user = await requireSubmitter()
  const id = String(formData.get("id") ?? "")
  if (!id) return { ...EMPTY, message: "Missing id." }

  const events = await readAll("events")
  const existing = events.find((e) => e.id === id)
  if (!existing) return { ...EMPTY, message: "Not found." }
  if (existing.submitterUserId !== user.id) return { ...EMPTY, message: "Not your submission." }
  if (existing.locked || existing.status !== "pending") {
    return { ...EMPTY, message: "This submission has already been reviewed and is locked." }
  }

  const parsed = Schema.safeParse({
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
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const iss of parsed.error.issues) errors[iss.path[0] as string] = iss.message
    return { ...EMPTY, message: "Please fix the highlighted fields.", errors }
  }

  let flyerPath = existing.flyerPath
  const flyerRaw = formData.get("flyer")
  if (flyerRaw instanceof File && flyerRaw.size > 0) {
    try {
      const stored = await storeFlyer(flyerRaw)
      flyerPath = stored.publicPath
    } catch (err) {
      return { ...EMPTY, message: err instanceof Error ? err.message : "Flyer upload failed." }
    }
  }

  const updated: HubEvent = {
    ...existing,
    ...parsed.data,
    endDate: parsed.data.endDate || undefined,
    registrationUrl: parsed.data.registrationUrl || undefined,
    flyerPath,
    updatedAt: now(),
  }
  await upsert("events", updated)
  revalidatePath("/portal/my-submissions")
  revalidatePath(`/admin/events/${id}`)
  return { success: true, message: "Saved.", createdId: id }
}