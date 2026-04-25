import type { Metadata } from "next"
import Link from "next/link"
import { ActionStrip, FocalPanel, PageShell } from "@/lib/components/atlas"

export const metadata: Metadata = { title: "Sign-in error" }
export const dynamic = "force-dynamic"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams

  return (
    <PageShell tone="portal">
      <div className="door-panel shell">
        <FocalPanel
          kicker="Auth error"
          title="The door did not open."
          lead={message || "Sign-in failed. Try again, or head back home."}
          actions={
            <ActionStrip>
              <Link href="/auth/sign-in" className="btn btn--primary">
                Try again
              </Link>
              <Link href="/" className="btn btn--ghost">
                Home
              </Link>
            </ActionStrip>
          }
        />
      </div>
    </PageShell>
  )
}
