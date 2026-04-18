"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

interface NavItem {
  href: string
  label: string
}

const PRIMARY_NAV: NavItem[] = [
  { href: "/meetings", label: "Meetings" },
  { href: "/conferences", label: "Conferences" },
  { href: "/what-is-ypaa", label: "What is YPAA" },
  { href: "/about", label: "About" },
]

const SECONDARY_NAV: NavItem[] = [
  { href: "/safety", label: "Safety" },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setClosing(false)
    }, 180)
  }, [])

  return (
    <>
      <header className="nav">
        <div className="nav__inner">
          <Link href="/" className="nav__logo" onClick={() => menuOpen && closeMenu()} aria-label="HUBYPAA — home">
            HUBYPAA
            <span className="nav__logo-star" aria-hidden>✦</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                data-active={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {SECONDARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                data-active={pathname === item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/submit" className="nav__cta">Submit</Link>
          </div>

          <button
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="nav__menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="nav-overlay" data-closing={closing}>
          <nav className="flex flex-col" aria-label="Mobile">
            {[...PRIMARY_NAV, ...SECONDARY_NAV, { href: "/submit", label: "Submit" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-overlay__link"
                data-active={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                onClick={closeMenu}
              >
                {item.label}
                <span aria-hidden style={{ color: "var(--color-ink-4)" }}>→</span>
              </Link>
            ))}
          </nav>

          <p className="caption mt-auto pt-8 text-center">
            Principles before personalities. No names, no endorsements, no attendance data.
          </p>
        </div>
      )}
    </>
  )
}
