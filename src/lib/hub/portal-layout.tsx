import Link from "next/link"

export interface PortalNavItem {
  href: string
  label: string
  active?: boolean
}

export function PortalSubnav({ items }: { items: PortalNavItem[] }) {
  return (
    <nav className="shell pt-2" aria-label="Portal">
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition"
            style={{
              borderColor: i.active
                ? "rgba(245,184,71,0.45)"
                : "var(--color-border-2)",
              background: i.active ? "rgba(245,184,71,0.1)" : "var(--color-surface)",
              color: i.active ? "var(--color-accent-bright)" : "var(--color-fg-2)",
            }}
          >
            {i.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}