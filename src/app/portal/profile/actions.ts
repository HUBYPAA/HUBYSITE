"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { notify } from "@/lib/hub/notifications"
import type { DirectoryContact } from "@/lib/hub/types"

const Schema = z.object({
  name: z.string().trim().min(1).max(200),
  committee: z.string().trim().min(1).max(200),
  role: z.string().trim().min(1).max(200),
  regionId: z.string().optional(),
  email: z.email(),
  phone: z.string().trim().max(80).optional(),
  yearsServed: z.string().trim().max(80).optional(),
  willingToHelpWith: z.string().trim().max(1000).optional(),
  termEndsAt: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).optional(),
  consentRemainAfterTerm: z.enum(["on", "off"]).optional(),
  consentHelperList: z.enum(["on", "off"]).optional(),
  consentPastList: z.enum(["on", "off"]).optional(),
})

export type State = { success: boolean; message: string; errors?: Record<string, string> }
const EMPTY: State = { success: false, message: "" }

export async function saveProfile(_prev: State, formData: FormData): Promise<State> {
  const user = await requirePortalAccess()

  const parsed = Schema.safeParse({
    name: formData.get("name"),
    committee: formData.get("committee"),
    role: formData.get("role"),
    regionId: formData.get("regionId") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    yearsServed: formData.get("yearsServed") || undefined,
    willingToHelpWith: formData.get("willingToHelpWith") || undefined,
    termEndsAt: formData.get("termEndsAt") ?? "",
    consentRemainAfterTerm: formData.get("consentRemainAfterTerm") ? "on" : "off",
    consentHelperList: formData.get("consentHelperList") ? "on" : "off",
    consentPastList: formData.get("consentPastList") ? "on" : "off",
  })
  if (!parsed.success) {
    const errors: Record<string, string> = {}
    for (const iss of parsed.error.issues) errors[iss.path[0] as string] = iss.message
    return { ...EMPTY, message: "Fix the highlighted fields.", errors }
  }

  const contacts = await readAll("directory_contacts")
  const existing = contacts.find((c) => c.userId === user.id)

  const listings: DirectoryContact["listings"] = []
  // User controls helper opt-in directly; "current" is assigned by admins on approval.
  if (existing?.listings.includes("current") && existing.status === "approved") {
    listings.push("current")
  }
  if (parsed.data.consentHelperList === "on") listings.push("helper")

  const contact: DirectoryContact = existing
    ? {
        ...existing,
        name: parsed.data.name,
        committee: parsed.data.committee,
        role: parsed.data.role,
        regionId: parsed.data.regionId,
        email: parsed.data.email,
        phone: parsed.data.phone,
        yearsServed: parsed.data.yearsServed,
        willingToHelpWith: parsed.data.willingToHelpWith,
        termEndsAt: parsed.data.termEndsAt || undefined,
        consentRemainAfterTerm: parsed.data.consentRemainAfterTerm === "on",
        consentHelperList: parsed.data.consentHelperList === "on",
        consentPastList: parsed.data.consentPastList === "on",
        // If helper-only (no admin-approved current listing yet), retain helper listing.
        listings: listings.length > 0 ? listings : existing.listings,
        updatedAt: now(),
      }
    : {
        id: newId(),
        userId: user.id,
        name: parsed.data.name,
        committee: parsed.data.committee,
        role: parsed.data.role,
        regionId: parsed.data.regionId,
        email: parsed.data.email,
        phone: parsed.data.phone,
        yearsServed: parsed.data.yearsServed,
        willingToHelpWith: parsed.data.willingToHelpWith,
        termEndsAt: parsed.data.termEndsAt || undefined,
        consentRemainAfterTerm: parsed.data.consentRemainAfterTerm === "on",
        consentHelperList: parsed.data.consentHelperList === "on",
        consentPastList: parsed.data.consentPastList === "on",
        listings: listings.length > 0 ? listings : [],
        status: "pending",
        createdAt: now(),
        updatedAt: now(),
      }
  await upsert("directory_contacts", contact)

  if (!existing) {
    await notify("admins", "directory_submitted", `${user.name} asked to join the directory`, {
      href: "/admin/directory",
      meta: { contactId: contact.id, userId: user.id },
    })
  }

  revalidatePath("/portal/profile")
  revalidatePath("/admin/directory")
  return { success: true, message: "Saved." }
}