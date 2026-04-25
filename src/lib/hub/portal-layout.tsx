import Link from "next/link"

export interface PortalNavItem {
  href: string
  label: string
  active?: boolean
}

export function PortalSubnav({ items }: { items: PortalNavItem[] }) {
  return (
    <nav className="shell pt-2" aria-label="Portal">
      <div className="action-strip">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={i.active ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
          >
            {i.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
