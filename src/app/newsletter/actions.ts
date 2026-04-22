"use server"

import { z } from "zod"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { ensureSeed } from "@/lib/hub/seed"
import type { NewsletterSubscriber } from "@/lib/hub/types"

const Schema = z.object({
  email: z.email({ error: "Enter a valid email address." }).trim().toLowerCase(),
  name: z.string().trim().max(160).optional(),
  regionIds: z.array(z.string()).default([]),
  consent: z.literal("on", { error: "Please confirm the consent box." }),
})

export type SubscribeState = {
  success: boolean
  message: string
  errors?: Partial<Record<"email" | "name" | "regionIds" | "consent", string>>
}

export async function subscribeToNewsletter(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  await ensureSeed()

  const parsed = Schema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") || undefined,
    regionIds: formData.getAll("regionIds").map(String),
    consent: formData.get("consent"),
  })
  if (!parsed.success) {
    const errors: SubscribeState["errors"] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<SubscribeState["errors"]>
      errors[key] = issue.message
    }
    return { success: false, message: "Please fix the highlighted fields.", errors }
  }

  const subs = await readAll("newsletter_subscribers")
  const existing = subs.find((s) => s.email === parsed.data.email)

  const subscriber: NewsletterSubscriber = existing
    ? {
        ...existing,
        name: parsed.data.name ?? existing.name,
        regionIds: parsed.data.regionIds,
        unsubscribedAt: undefined,
        confirmed: true,
        updatedAt: now(),
      }
    : {
        id: newId(),
        email: parsed.data.email,
        name: parsed.data.name,
        regionIds: parsed.data.regionIds,
        confirmed: true,
        createdAt: now(),
        updatedAt: now(),
      }

  await upsert("newsletter_subscribers", subscriber)

  return {
    success: true,
    message:
      "You're on the list. The newsletter is sent at most bi-monthly, and skipped when there's nothing meaningful to share.",
  }
}