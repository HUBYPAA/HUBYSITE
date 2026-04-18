"use client"

import { useCallback, useEffect, useRef, useState } from "react"
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
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  // Track scroll depth to tint + shadow the nav band
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setClosing(false)
      // Return focus to the button that opened the menu
      requestAnimationFrame(() => menuBtnRef.current?.focus())
    }, 180)
  }, [])

  // ESC to close mobile menu
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen, closeMenu])

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) closeMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <>
      <header ref={headerRef} className="nav" data-scrolled={scrolled}>
        <div className="nav__inner">
          <Link
            href="/"
            className="nav__logo"
            aria-label="HUBYPAA — home"
          >
            HUBYPAA
            <span className="nav__logo-star" aria-hidden>✦</span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                data-active={isActive(item.href)}
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
                data-active={isActive(item.href)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/submit" className="nav__cta">Submit</Link>
          </div>

          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            className="nav__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-overlay"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-nav-overlay"
          className="nav-overlay"
          data-closing={closing}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {[...PRIMARY_NAV, ...SECONDARY_NAV, { href: "/submit", label: "Submit" }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-overlay__link"
                data-active={isActive(item.href)}
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
