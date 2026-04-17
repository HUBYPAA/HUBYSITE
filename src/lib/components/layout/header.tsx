"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { HeraldicGlyph, type GlyphName } from "@/lib/components/ornaments/heraldic-glyph"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"

interface NavItem {
  href: string
  label: string
  glyph: GlyphName
}

const PRIMARY_NAV: NavItem[] = [
  { href: "/meetings", label: "meetings", glyph: "shield-cross" },
  { href: "/conferences", label: "conferences", glyph: "star-diamond" },
  { href: "/what-is-ypaa", label: "what is ypaa", glyph: "open-book" },
  { href: "/about", label: "about", glyph: "tower-renaissance" },
]

const SECONDARY_NAV: NavItem[] = [
  { href: "/safety", label: "safety & anonymity", glyph: "winged-shield" },
  { href: "/submit", label: "submit / update", glyph: "quill-key" },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
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
    if (menuOpen) closeMenu()
    else setMenuOpen(true)
  }, [menuOpen, closeMenu])

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="site-header-brick relative z-[100]">
        <div className="site-shell flex h-[4.5rem] items-center justify-between gap-5 py-3">
          {/* Logo: HUBYPAA✦ — gilt star-period */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => menuOpen && closeMenu()}
            aria-label="HUBYPAA — home"
          >
            {/* Asymmetric tower flanking glyphs */}
            <span className="hidden items-center gap-2 text-[var(--color-gilt-shadow)] sm:inline-flex">
              <HeraldicGlyph name="tower-gothic" className="h-3.5 w-3.5 opacity-80" />
            </span>

            <span
              className="text-[var(--color-ivory)] transition-colors group-hover:text-[var(--color-gilt-lit)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1.45rem",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              HUBYPAA
              <span className="ml-0.5 inline-block translate-y-[-0.1em] text-[var(--color-gilt)]" aria-hidden>
                <HeraldicGlyph name="star-eight" className="inline h-[0.7em] w-[0.7em] align-baseline" />
              </span>
            </span>

            <span className="hidden items-center gap-2 text-[var(--color-gilt-shadow)] sm:inline-flex">
              <HeraldicGlyph name="tower-renaissance" className="h-3.5 w-3.5 opacity-80" />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="header-link"
                  data-active={active}
                >
                  <HeraldicGlyph name={item.glyph} className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/safety" className="header-link" data-active={pathname === "/safety"}>
              <HeraldicGlyph name="winged-shield" className="h-3.5 w-3.5" />
              safety
            </Link>
            <Link href="/submit" className="action-altar" style={{ minHeight: "2.6rem", padding: "0.55rem 1.1rem", fontSize: "0.78rem" }}>
              submit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={toggleMenu}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[rgba(220,177,58,0.32)] bg-[rgba(17,27,74,0.42)] text-[var(--color-ivory)] lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "close navigation" : "open navigation"}
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
          <nav className="stagger-in flex flex-col gap-2.5">
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
                  <HeraldicGlyph
                    name={item.glyph}
                    className={`h-5 w-5 ${active ? "text-[var(--color-gilt-lit)]" : "text-[var(--color-crimson)]"}`}
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="my-7">
            <FiligreeRule />
          </div>

          <div className="stagger-in grid gap-2.5">
            {SECONDARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                data-active={pathname === item.href}
                onClick={closeMenu}
              >
                <HeraldicGlyph
                  name={item.glyph}
                  className={`h-5 w-5 ${pathname === item.href ? "text-[var(--color-gilt-lit)]" : "text-[var(--color-crimson)]"}`}
                />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <FiligreeRule className="mb-6" />
            <p
              className="text-center text-[0.78rem] leading-7 text-[var(--color-muted)]"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
              }}
            >
              principles before personalities.
              <br />
              no personal names, no endorsements, no attendance data.
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
