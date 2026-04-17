"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CalendarDays,
  Compass,
  HelpCircle,
  MapPinned,
  Menu,
  Send,
  Shield,
  X,
} from "lucide-react"

const PRIMARY_NAV = [
  { href: "/meetings", label: "Meetings", icon: MapPinned },
  { href: "/conferences", label: "Conferences", icon: CalendarDays },
  { href: "/what-is-ypaa", label: "What Is YPAA", icon: HelpCircle },
  { href: "/about", label: "About", icon: Compass },
]

const SECONDARY_NAV = [
  { href: "/safety", label: "Safety & Anonymity", icon: Shield },
  { href: "/submit", label: "Submit / Update", icon: Send },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const closeMenu = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setMenuOpen(false)
      setClosing(false)
    }, 220)
  }, [])

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      closeMenu()
    } else {
      setMenuOpen(true)
    }
  }, [menuOpen, closeMenu])

  const isHome = pathname === "/"

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div
        className="site-header-glass relative z-[100] transition-all duration-300"
        style={{
          borderBottom: scrolled || !isHome
            ? "1px solid rgba(60,42,28,0.1)"
            : "1px solid rgba(60,42,28,0.05)",
          boxShadow: scrolled
            ? "0 18px 42px rgba(60,42,28,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <div className="site-shell flex h-[4.25rem] items-center justify-between gap-5 py-3">
          <Link href="/" className="group flex items-center gap-3" onClick={() => menuOpen && closeMenu()}>
            <div className="flex flex-col">
              <span className="font-serif text-[1.25rem] font-medium tracking-[-0.04em] text-ink transition-colors group-hover:text-accent">
                HUBYPAA
              </span>
              <span className="meta-label hidden sm:block">The YPAA Hub</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="rounded-[0.75rem] border px-4 py-2 text-sm font-medium transition-all"
                  style={{
                    color: active ? "var(--color-ink)" : "var(--color-muted)",
                    background: active ? "rgba(200, 164, 78, 0.12)" : "rgba(250, 248, 245, 0.22)",
                    borderColor: active ? "rgba(200, 164, 78, 0.22)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/safety" className="action-quiet">
              <Shield className="h-4 w-4" />
              Safety
            </Link>
            <Link href="/submit" className="action-primary">
              Submit / Update
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-[0.75rem] border border-ink/8 bg-panel/80 text-ink shadow-[0_8px_20px_rgba(60,42,28,0.07)] lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            style={{
              borderColor: menuOpen ? "rgba(200,164,78,0.24)" : undefined,
              background: menuOpen ? "rgba(200,164,78,0.08)" : undefined,
            }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-200"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            >
              <X className="h-4 w-4" />
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center transition-all duration-200"
              style={{
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              <Menu className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen mobile nav overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="mobile-nav-overlay"
          data-closing={closing}
        >
          <nav className="stagger-in flex flex-col gap-1">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  data-active={active}
                  onClick={closeMenu}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="rule my-6" />

          <div className="stagger-in grid gap-3">
            {SECONDARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={pathname === item.href}
                onClick={closeMenu}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <div className="rule mb-6" />
            <p className="text-center text-xs leading-6 text-faint">
              AA principles before personalities.
              <br />
              No personal names, no endorsements, no attendance data.
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
