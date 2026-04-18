import Link from "next/link"

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="max-w-xl text-center">
        <p className="eyebrow mono">404</p>
        <h1 className="display-1 mt-4">This page doesn&rsquo;t exist.</h1>
        <p className="body-lg mt-5">
          The link may be stale, the route may have moved, or the record may
          not exist yet. Try the doors that stay open most often.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-vault btn-lg">Home</Link>
          <Link href="/meetings" className="btn btn-secondary btn-lg">Meetings</Link>
          <Link href="/conferences" className="btn btn-secondary btn-lg">Conferences</Link>
        </div>
      </div>
    </div>
  )
}
