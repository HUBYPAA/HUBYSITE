import type { Metadata } from "next"
import Link from "next/link"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = { title: "Sign-in error" }
export const dynamic = "force-dynamic"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams
  return (
    <>
      <PortalHeader
        kicker="Sign-in error"
        title="That didn't work."
        subtitle={message || "Sign-in failed. Please try again."}
      />
      <section className="shell">
        <div className="mx-auto max-w-xl card">
          <Link href="/auth/sign-in" className="btn btn-amber">Try again</Link>
        </div>
      </section>
    </>
  )
}