import { NextResponse } from "next/server"
import { clearSession } from "@/lib/hub/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  await clearSession()
  return NextResponse.redirect(new URL("/", req.url))
}

export async function POST(req: Request) {
  await clearSession()
  return NextResponse.redirect(new URL("/", req.url), { status: 303 })
}