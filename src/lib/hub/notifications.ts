import "server-only"
import { newId, now, upsert } from "./store"
import type { HubNotification, NotificationKind } from "./types"

export async function notify(
  audience: string,
  kind: NotificationKind,
  title: string,
  opts: { body?: string; href?: string; meta?: Record<string, unknown> } = {},
): Promise<HubNotification> {
  const record: HubNotification = {
    id: newId(),
    kind,
    audience,
    title,
    body: opts.body,
    href: opts.href,
    meta: opts.meta,
    createdAt: now(),
  }
  await upsert("notifications", record)
  return record
}