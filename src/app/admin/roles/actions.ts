"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { readAll, upsert, now } from "@/lib/hub/store"
import { requireAdmin, hasRole } from "@/lib/hub/auth"
import type { HubRole } from "@/lib/hub/types"

const ROLES: HubRole[] = ["events_admin", "newsletter_admin", "directory_admin", "super_admin"]

const Schema = z.object({
  userId: z.string().min(1),
  roles: z.array(z.enum(ROLES as [HubRole, ...HubRole[]])).default([]),
})

export async function setUserRoles(formData: FormData): Promise<void> {
  const me = await requireAdmin()
  if (!hasRole(me, "super_admin")) throw new Error("Only super_admin can change roles")
  const parsed = Schema.parse({
    userId: formData.get("userId"),
    roles: formData.getAll("roles").map(String) as HubRole[],
  })
  const users = await readAll("users")
  const u = users.find((x) => x.id === parsed.userId)
  if (!u) return
  await upsert("users", { ...u, roles: parsed.roles, updatedAt: now() })
  revalidatePath("/admin/roles")
}