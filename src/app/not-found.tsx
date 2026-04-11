import Link from "next/link"

export default function NotFound() {
  return (
    <div className="site-shell flex min-h-[70vh] items-center justify-center py-24">
      <div className="panel-raised max-w-xl p-8 text-center md:p-10">
        <p className="meta-label">404</p>
        <h1 className="mt-5 font-serif text-4xl tracking-[-0.04em] text-ink">
          That page is not in this directory.
        </h1>
        <p className="mt-5 text-sm leading-7 text-muted">
          The link may be stale, the route may have moved, or the record may not
          exist yet.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="action-primary">
            Home
          </Link>
          <Link href="/meetings" className="action-secondary">
            Meetings
          </Link>
          <Link href="/conferences" className="action-secondary">
            Conferences
          </Link>
        </div>
      </div>
    </div>
  )
}
