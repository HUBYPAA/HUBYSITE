/**
 * Flyer / image upload handling.
 *
 * Writes files under `public/uploads/flyers/` so Next.js can serve them
 * directly. Only a safe set of image MIME types is accepted. All other
 * formats (PDFs, executables, archives, scripts) are rejected.
 */

import "server-only"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { randomUUID } from "node:crypto"

const ALLOWED_MIME = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/avif", ".avif"],
])

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB

export interface StoredUpload {
  publicPath: string
}

export async function storeFlyer(file: File): Promise<StoredUpload> {
  if (!(file instanceof File)) {
    throw new Error("No file provided.")
  }
  if (file.size === 0) throw new Error("Flyer is empty.")
  if (file.size > MAX_BYTES) {
    throw new Error(`Flyer is too large. Maximum is ${MAX_BYTES / (1024 * 1024)} MB.`)
  }
  const ext = ALLOWED_MIME.get(file.type)
  if (!ext) {
    throw new Error(
      "Unsupported flyer format. Use JPG, PNG, WEBP, GIF, or AVIF.",
    )
  }

  const dir = path.join(process.cwd(), "public", "uploads", "flyers")
  await mkdir(dir, { recursive: true })
  const name = `${randomUUID()}${ext}`
  const fullPath = path.join(dir, name)
  const buf = Buffer.from(await file.arrayBuffer())
  await writeFile(fullPath, buf)

  return { publicPath: `/uploads/flyers/${name}` }
}