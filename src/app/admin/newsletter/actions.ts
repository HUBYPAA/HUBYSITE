"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { readAll, upsert, remove, newId, now } from "@/lib/hub/store"
import { requireAdmin, canManageNewsletter } from "@/lib/hub/auth"
import { notify } from "@/lib/hub/notifications"
import type { NewsletterDraft } from "@/lib/hub/types"

async function gate() {
  const me = await requireAdmin()
  if (!canManageNewsletter(me)) throw new Error("Not allowed")
  return me
}

export async function removeSubscriber(formData: FormData): Promise<void> {
  await gate()
  const id = String(formData.get("id") ?? "")
  if (!id) return
  await remove("newsletter_subscribers", id)
  revalidatePath("/admin/newsletter")
}

const DraftSchema = z.object({
  id: z.string().optional(),
  slug: z.string().trim().min(2).max(80),
  subject: z.string().trim().min(2).max(200),
  intro: z.string().trim().max(4000).default(""),
  body: z.string().trim().max(20000).default(""),
  senderName: z.string().trim().default("YIS- HUBYPAA"),
  senderEmail: z.string().trim().default(""),
  eventIds: z.array(z.string()).default([]),
  regionIds: z.array(z.string()).default([]),
  action: z.enum(["save", "ready", "sent", "skipped"]),
})

export async function saveDraft(formData: FormData): Promise<void> {
  const me = await gate()
  const parsed = DraftSchema.parse({
    id: (formData.get("id") as string) || undefined,
    slug: formData.get("slug"),
    subject: formData.get("subject"),
    intro: formData.get("intro") ?? "",
    body: formData.get("body") ?? "",
    senderName: formData.get("senderName") || "YIS- HUBYPAA",
    senderEmail: formData.get("senderEmail") ?? "",
    eventIds: formData.getAll("eventIds").map(String),
    regionIds: formData.getAll("regionIds").map(String),
    action: formData.get("action"),
  })
  const drafts = await readAll("newsletter_drafts")
  const existing = parsed.id ? drafts.find((d) => d.id === parsed.id) : undefined

  const status: NewsletterDraft["status"] =
    parsed.action === "ready" ? "ready" :
    parsed.action === "sent" ? "sent" :
    parsed.action === "skipped" ? "skipped" : "draft"

  const draft: NewsletterDraft = existing
    ? {
        ...existing,
        slug: parsed.slug,
        subject: parsed.subject,
        intro: parsed.intro,
        body: parsed.body,
        senderName: parsed.senderName,
        senderEmail: parsed.senderEmail,
        eventIds: parsed.eventIds,
        regionIds: parsed.regionIds,
        status,
        sentAt: status === "sent" ? now() : existing.sentAt,
        sentBy: status === "sent" ? me.id : existing.sentBy,
        updatedAt: now(),
      }
    : {
        id: newId(),
        slug: parsed.slug,
        subject: parsed.subject,
        intro: parsed.intro,
        body: parsed.body,
        senderName: parsed.senderName,
        senderEmail: parsed.senderEmail,
        eventIds: parsed.eventIds,
        regionIds: parsed.regionIds,
        status,
        sentAt: status === "sent" ? now() : undefined,
        sentBy: status === "sent" ? me.id : undefined,
        createdBy: me.id,
        createdAt: now(),
        updatedAt: now(),
      }

  await upsert("newsletter_drafts", draft)
  if (status === "ready" && !existing) {
    await notify("admins", "newsletter_draft_ready", `Draft marked ready: ${draft.subject}`, {
      href: `/admin/newsletter`,
    })
  }
  revalidatePath("/admin/newsletter")
}