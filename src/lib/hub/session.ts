/**
 * HUBYPAA session handling.
 *
 * A session is an HMAC-signed JSON payload stored in an HttpOnly cookie.
 * We deliberately avoid pulling in a full auth library — the shape here is
 * tiny (sign-in via Google OAuth, optional waitlist, role checks), and a
 * custom signed cookie is the smallest honest implementation.
 */

import "server-only"
import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "node:crypto"
import type { SessionPayload } from "./types"

const COOKIE_NAME = "hub_session"
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7

function secret(): string {
  const s = process.env.HUB_SESSION_SECRET
  if (!s || s.length < 16) {
    throw new Error(
      "HUB_SESSION_SECRET is not configured (min 16 chars). " +
        "Set it in .env.local; see .env.example.",
    )
  }
  return s
}

function b64urlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
}

function b64urlDecode(s: string): Buffer {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4))
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64")
}

function sign(payload: string): string {
  return b64urlEncode(
    createHmac("sha256", secret()).update(payload).digest(),
  )
}

function verify(payload: string, mac: string): boolean {
  const expected = sign(payload)
  const a = Buffer.from(expected)
  const b = Buffer.from(mac)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function encodeSession(payload: SessionPayload): string {
  const body = b64urlEncode(Buffer.from(JSON.stringify(payload)))
  const mac = sign(body)
  return `${body}.${mac}`
}

export function decodeSession(token: string): SessionPayload | null {
  const [body, mac] = token.split(".")
  if (!body || !mac) return null
  if (!verify(body, mac)) return null
  try {
    const payload = JSON.parse(b64urlDecode(body).toString("utf8")) as SessionPayload
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

export async function setSession(payload: Omit<SessionPayload, "iat" | "exp">) {
  const iat = Math.floor(Date.now() / 1000)
  const full: SessionPayload = { ...payload, iat, exp: iat + ONE_WEEK_SECONDS }
  const token = encodeSession(full)
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK_SECONDS,
  })
}

export async function clearSession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  return decodeSession(token)
}