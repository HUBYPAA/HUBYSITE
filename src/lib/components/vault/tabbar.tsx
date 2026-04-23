"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/", label: "VAULT", icon: "✦" },
  { href: "/meetings", label: "MEET", icon: "◉" },
  { href: "/conferences", label: "CONFS", icon: "◆" },
  { href: "/submit", label: "INSCRIBE", icon: "✎" },
  { href: "/about", label: "HELP", icon: "?" },
]

/** THE VAULT · mobile bottom tab bar */
export function Tabbar() {
  const pathname = usePathname() ?? "/"
  return (
    <nav className="tabbar" aria-label="Mobile">
      {TABS.map((t) => {
        const active =
          t.href === "/"
            ? pathname === "/"
            : pathname === t.href || pathname.startsWith(`${t.href}/`)
        return (
          <Link key={t.href} href={t.href} className={active ? "active" : ""}>
            <span className="ic" aria-hidden>
              {t.icon}
            </span>
            {t.label}
          </Link>
        )
      })}
    </nav>
  )
}