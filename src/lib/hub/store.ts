/**
 * HUBYPAA communications module — file-backed data store.
 *
 * Design:
 * - Each collection is persisted as a JSON file under `HUB_DATA_DIR`
 *   (defaults to `./.hub-data` — git-ignored).
 * - Reads are cached in-memory during a single request; writes fsync.
 * - A simple per-process promise queue serializes writes to each file
 *   to avoid concurrent overwrites within a running Node instance.
 *
 * This is deliberately small and swap-able. In production environments
 * without a persistent filesystem (e.g. serverless), point HUB_DATA_DIR
 * to a mounted volume, or replace this module's read/write primitives
 * with a database adapter. Routes call `readAll` / `writeAll` / `upsert`
 * / `remove` and never touch the filesystem directly.
 */

import "server-only"
import { mkdir, readFile, writeFile, rename } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"

import type {
  DirectoryContact,
  HubEvent,
  HubNotification,
  HubRegion,
  HubUser,
  NewsletterDraft,
  NewsletterSubscriber,
  PortalAccessRequest,
  SubmitterAccessRequest,
} from "./types"

// ── Directory ────────────────────────────────────────────────────────

const DATA_DIR = process.env.HUB_DATA_DIR
  ? path.resolve(process.env.HUB_DATA_DIR)
  : path.resolve(process.cwd(), ".hub-data")

async function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true })
  }
}

function fileFor(collection: string) {
  return path.join(DATA_DIR, `${collection}.json`)
}

// ── Serialized writes per collection ─────────────────────────────────

const locks = new Map<string, Promise<void>>()

async function withLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(key) ?? Promise.resolve()
  let release: () => void = () => {}
  const next = new Promise<void>((r) => { release = r })
  locks.set(key, prev.then(() => next))
  try {
    await prev
    return await fn()
  } finally {
    release()
    if (locks.get(key) === next) locks.delete(key)
  }
}

// ── Primitives ───────────────────────────────────────────────────────

async function readJson<T>(collection: string, fallback: T): Promise<T> {
  await ensureDir()
  const p = fileFor(collection)
  if (!existsSync(p)) return fallback
  try {
    const raw = await readFile(p, "utf8")
    if (!raw.trim()) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJson<T>(collection: string, value: T): Promise<void> {
  await ensureDir()
  const p = fileFor(collection)
  const tmp = `${p}.tmp-${process.pid}-${Date.now()}`
  await writeFile(tmp, JSON.stringify(value, null, 2), "utf8")
  await rename(tmp, p)
}

// ── Collection schema ────────────────────────────────────────────────

export type Collections = {
  users: HubUser[]
  regions: HubRegion[]
  events: HubEvent[]
  portal_access_requests: PortalAccessRequest[]
  submitter_access_requests: SubmitterAccessRequest[]
  newsletter_subscribers: NewsletterSubscriber[]
  newsletter_drafts: NewsletterDraft[]
  directory_contacts: DirectoryContact[]
  notifications: HubNotification[]
}

export type CollectionName = keyof Collections

// ── Public API ──────────────────────────────────────────────────────

export async function readAll<K extends CollectionName>(
  name: K,
): Promise<Collections[K]> {
  return readJson<Collections[K]>(name, [] as unknown as Collections[K])
}

export async function writeAll<K extends CollectionName>(
  name: K,
  items: Collections[K],
): Promise<void> {
  await withLock(name, () => writeJson(name, items))
}

type WithId = { id: string }

export async function upsert<K extends CollectionName>(
  name: K,
  item: Collections[K][number],
): Promise<Collections[K][number]> {
  return (await withLock(name, async () => {
    const all = (await readJson<Collections[K]>(
      name,
      [] as unknown as Collections[K],
    )) as unknown as WithId[]
    const idx = all.findIndex((x) => x.id === (item as WithId).id)
    if (idx >= 0) {
      all[idx] = item as WithId
    } else {
      all.push(item as WithId)
    }
    await writeJson(name, all as unknown as Collections[K])
    return item
  })) as Collections[K][number]
}

export async function remove<K extends CollectionName>(
  name: K,
  id: string,
): Promise<boolean> {
  return withLock(name, async () => {
    const all = (await readJson<Collections[K]>(
      name,
      [] as unknown as Collections[K],
    )) as unknown as WithId[]
    const next = all.filter((x) => x.id !== id)
    if (next.length === all.length) return false
    await writeJson(name, next as unknown as Collections[K])
    return true
  })
}

export function newId(): string {
  return randomUUID()
}

export function now(): string {
  return new Date().toISOString()
}