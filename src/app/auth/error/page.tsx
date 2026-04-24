import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Sign-in error" }
export const dynamic = "force-dynamic"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const { message } = await searchParams
  return (
    <section className="star-moment">
      <span className="starmark starmark--hero" aria-hidden />
      <h1 className="star-moment__title">
        That <em>didn&rsquo;t work.</em>
      </h1>
      <p className="star-moment__lede">
        {message || "Sign-in failed. Please try again."}
      </p>
      <div className="star-moment__actions">
        <Link href="/auth/sign-in" className="btn btn--gold">Try again</Link>
        <Link href="/" className="btn btn--ghost">Home</Link>
      </div>
    </section>
  )
}
