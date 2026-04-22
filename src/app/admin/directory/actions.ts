"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { readAll, upsert, now } from "@/lib/hub/store"
import { requireAdmin, canManageDirectory } from "@/lib/hub/auth"
import { applyDirectoryLifecycle } from "@/lib/hub/lifecycle"
import { notify } from "@/lib/hub/notifications"
import type { DirectoryContact } from "@/lib/hub/types"

async function gate() {
  const me = await requireAdmin()
  if (!canManageDirectory(me)) throw new Error("Not allowed")
  return me
}

const ApproveSchema = z.object({
  id: z.string().min(1),
  listings: z.array(z.enum(["current", "helper", "past"])).min(1),
})

export async function approveContact(formData: FormData): Promise<void> {
  const me = await gate()
  const listings = formData.getAll("listings").map(String) as DirectoryContact["listings"]
  const parsed = ApproveSchema.parse({ id: formData.get("id"), listings })
  const contacts = await readAll("directory_contacts")
  const c = contacts.find((x) => x.id === parsed.id)
  if (!c) return
  const updated: DirectoryContact = {
    ...c,
    status: "approved",
    listings: Array.from(new Set(parsed.listings)),
    approvedBy: me.id,
    approvedAt: now(),
    updatedAt: now(),
  }
  await upsert("directory_contacts", updated)
  if (c.userId) {
    await notify(c.userId, "directory_approved", "You're in the directory", {
      href: "/portal/directory",
    })
  }
  revalidatePath("/admin/directory")
  revalidatePath("/portal/directory")
}

export async function purgeContact(formData: FormData): Promise<void> {
  await gate()
  const id = String(formData.get("id") ?? "")
  const contacts = await readAll("directory_contacts")
  const c = contacts.find((x) => x.id === id)
  if (!c) return
  await upsert("directory_contacts", { ...c, status: "purged", purgedAt: now(), updatedAt: now() })
  revalidatePath("/admin/directory")
  revalidatePath("/portal/directory")
}

export async function runLifecycle(): Promise<void> {
  await gate()
  await applyDirectoryLifecycle()
  revalidatePath("/admin/directory")
}