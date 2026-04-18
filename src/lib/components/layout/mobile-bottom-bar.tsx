"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, CalendarDays, PenSquare } from "lucide-react"

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/meetings", label: "Map", Icon: MapPin },
  { href: "/conferences", label: "Events", Icon: CalendarDays },
  { href: "/submit", label: "Submit", Icon: PenSquare },
] as const

export function MobileBottomBar() {
  const pathname = usePathname()

  return (
    <div className="mobile-bar">
      <nav className="mobile-bar__nav" aria-label="Mobile primary">
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              data-active={active}
              aria-current={active ? "page" : undefined}
              className="mobile-bar__tab"
            >
              <tab.Icon className="h-5 w-5" strokeWidth={1.75} />
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
