"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Shield, X } from "lucide-react"

const PRIMARY_NAV = [
  { href: "/meetings", label: "Meetings" },
  { href: "/conferences", label: "Conferences" },
  { href: "/what-is-ypaa", label: "What Is YPAA" },
  { href: "/about", label: "About" },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isHome = pathname === "/"

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div
        className="site-header-glass transition-all duration-300"
        style={{
          borderBottom: scrolled || !isHome
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="site-shell flex h-[4.5rem] items-center justify-between gap-5 py-3">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-serif text-[1.25rem] font-medium tracking-[-0.04em] text-ink transition-colors group-hover:text-accent">
                YPAA
              </span>
              <span className="meta-label hidden sm:block">Map-first directory</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: active ? "var(--color-ink)" : "var(--color-muted)",
                    background: active ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/safety" className="action-quiet" onClick={() => setMenuOpen(false)}>
              <Shield className="h-4 w-4" />
              Safety
            </Link>
            <Link href="/submit" className="action-primary" onClick={() => setMenuOpen(false)}>
              Submit / Update
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="site-shell mt-3 md:hidden">
          <div className="panel-raised fade-in p-4">
            <div className="space-y-1">
              {PRIMARY_NAV.map((item) => {
                const active = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-base"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      background: active ? "rgba(183, 140, 86, 0.14)" : "transparent",
                      color: active ? "var(--color-ink)" : "var(--color-muted)",
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="rule my-4" />

            <div className="grid gap-2">
              <Link href="/submit" className="action-primary" onClick={() => setMenuOpen(false)}>
                Submit / Update
              </Link>
              <Link href="/safety" className="action-secondary" onClick={() => setMenuOpen(false)}>
                <Shield className="h-4 w-4" />
                Safety & Anonymity
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
