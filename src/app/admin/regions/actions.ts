"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { readAll, upsert, newId, now } from "@/lib/hub/store"
import { requireAdmin } from "@/lib/hub/auth"

function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "").slice(0, 60) || "region"
}

const Schema = z.object({
  label: z.string().trim().min(2).max(120),
  slug: z.string().trim().max(80).optional(),
  sortOrder: z.coerce.number().int().default(100),
})

export async function createRegion(formData: FormData): Promise<void> {
  await requireAdmin()
  const parsed = Schema.parse({
    label: formData.get("label"),
    slug: formData.get("slug") || undefined,
    sortOrder: formData.get("sortOrder") || 100,
  })
  const existing = await readAll("regions")
  const slug = (parsed.slug ? slugify(parsed.slug) : slugify(parsed.label))
  if (existing.find((r) => r.slug === slug)) return
  await upsert("regions", {
    id: newId(),
    label: parsed.label,
    slug,
    sortOrder: parsed.sortOrder,
    active: true,
    createdAt: now(),
    updatedAt: now(),
  })
  revalidatePath("/admin/regions")
  revalidatePath("/events")
}

const UpdateSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().min(2).max(120),
  sortOrder: z.coerce.number().int(),
  active: z.enum(["on", "off"]).optional(),
})

export async function updateRegion(formData: FormData): Promise<void> {
  await requireAdmin()
  const parsed = UpdateSchema.parse({
    id: formData.get("id"),
    label: formData.get("label"),
    sortOrder: formData.get("sortOrder"),
    active: formData.get("active") ? "on" : "off",
  })
  const regions = await readAll("regions")
  const r = regions.find((x) => x.id === parsed.id)
  if (!r) return
  await upsert("regions", {
    ...r,
    label: parsed.label,
    sortOrder: parsed.sortOrder,
    active: parsed.active === "on",
    updatedAt: now(),
  })
  revalidatePath("/admin/regions")
  revalidatePath("/events")
}