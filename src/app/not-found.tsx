import Link from "next/link"
import { ActionStrip, FocalPanel, PageShell } from "@/lib/components/atlas"

export default function NotFound() {
  return (
    <PageShell tone="stone">
      <div className="door-panel shell">
        <FocalPanel
          kicker="Not found"
          title="This room is not on the map."
          lead="The link may be stale, the route may have moved, or the record may not exist yet."
          actions={
            <ActionStrip>
              <Link href="/meetings" className="btn btn--primary">
                Find meetings
              </Link>
              <Link href="/conferences" className="btn btn--secondary">
                View conferences
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
