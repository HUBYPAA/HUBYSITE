"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Home, MapPinned, Send } from "lucide-react"

const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/meetings", label: "Meetings", icon: MapPinned },
  { href: "/conferences", label: "Conferences", icon: CalendarDays },
  { href: "/submit", label: "Submit", icon: Send },
]

export function MobileBottomBar() {
  const pathname = usePathname()

  return (
    <div className="mobile-bottom-bar lg:hidden">
      <nav>
        {TABS.map((tab) => {
          const active =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href)

          return (
            <Link
              key={tab.href}
              href={tab.href}
              data-active={active}
              aria-current={active ? "page" : undefined}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
