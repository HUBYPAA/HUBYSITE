"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/conferences", label: "Conferences" },
  { href: "/events", label: "Events" },
  { href: "/submit", label: "Submit" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/what-is-ypaa", label: "What is YPAA?" },
  { href: "/safety", label: "Safety" },
  { href: "/about", label: "About" },
  { href: "/portal", label: "Portal" },
] as const

const BOTTOM_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
  { href: "/events", label: "Events" },
  { href: "/submit", label: "Submit" },
  { href: "/portal", label: "Portal" },
] as const

export function SiteChrome({
  meetingCount,
  conferenceCount,
  stateCount,
}: {
  meetingCount: number
  conferenceCount: number
  stateCount: number
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner shell">
          <Link href="/" className="site-brand" onClick={() => setOpen(false)}>
            <span className="site-brand__mark" aria-hidden="true" />
            <span className="site-brand__copy">
              <span className="site-brand__name">HUBYPAA</span>
              <span className="site-brand__sub">The Living Atlas</span>
            </span>
          </Link>

          <p className="site-header__signal" aria-label="Site signal">
            <span>{meetingCount.toLocaleString()} rooms</span>
            <span>{conferenceCount.toLocaleString()} conferences</span>
            <span>{stateCount} states</span>
          </p>

          <nav className="site-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "site-nav__link is-active" : "site-nav__link"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="site-header__toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          id="site-mobile-menu"
          className={open ? "site-mobile-menu is-open" : "site-mobile-menu"}
        >
          <nav className="shell site-mobile-menu__grid" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(pathname, item.href) ? "site-mobile-menu__link is-active" : "site-mobile-menu__link"}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav className="bottom-nav" aria-label="Quick navigation">
        <div className="bottom-nav__inner">
          {BOTTOM_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(pathname, item.href) ? "bottom-nav__link is-active" : "bottom-nav__link"}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
