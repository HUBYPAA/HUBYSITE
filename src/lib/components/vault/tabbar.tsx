"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Compass,
  MapPinned,
  CalendarDays,
  Pencil,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"

interface Tab {
  href: string
  label: string
  Icon: LucideIcon
}

const TABS: Tab[] = [
  { href: "/", label: "Vault", Icon: Compass },
  { href: "/meetings", label: "Meetings", Icon: MapPinned },
  { href: "/conferences", label: "Weekends", Icon: CalendarDays },
  { href: "/submit", label: "Submit", Icon: Pencil },
  { href: "/about", label: "About", Icon: HelpCircle },
]

/** THE VAULT · mobile bottom tab bar */
export function Tabbar() {
  const pathname = usePathname() ?? "/"
  return (
    <nav className="tabbar" aria-label="Mobile primary">
      {TABS.map(({ href, label, Icon }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={href}
            href={href}
            className={active ? "active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            <span className="tabbar__ic" aria-hidden>
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <span className="tabbar__lbl">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}