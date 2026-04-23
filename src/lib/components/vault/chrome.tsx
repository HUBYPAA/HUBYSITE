"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const PRIMARY_NAV = [
  { href: "/", label: "VAULT", meta: "live sky" },
  { href: "/meetings", label: "MEETINGS", meta: "stellar index" },
  { href: "/conferences", label: "CONFERENCES", meta: "constellations" },
  { href: "/events", label: "EVENTS", meta: "week ahead" },
  { href: "/submit", label: "SUBMIT", meta: "the ledger" },
]

const SECONDARY_NAV = [
  { href: "/newsletter", label: "NEWSLETTER", meta: "regional dispatch" },
  { href: "/what-is-ypaa", label: "WHAT IS YPAA", meta: "the glossary" },
  { href: "/safety", label: "SAFETY", meta: "anonymity held" },
  { href: "/about", label: "ABOUT", meta: "the keeper" },
  { href: "/portal", label: "PORTAL", meta: "approved access" },
]

interface ChromeProps {
  meetingCount?: number
  conferenceCount?: number
}

/**
 * THE VAULT · top chrome
 * Wordmark (HUBYPAA) · primary nav · right-aligned meta (hejnał + coords)
 */
export function Chrome({ meetingCount, conferenceCount }: ChromeProps = {}) {
  const pathname = usePathname() ?? "/"
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <>
      <nav className="chrome" aria-label="Primary">
        <Link href="/" className="chrome__brand" onClick={() => setMenuOpen(false)}>
          HUBY<b>P</b>AA
        </Link>
        <div className="chrome__nav">
          {PRIMARY_NAV.concat({ href: "/about", label: "ABOUT", meta: "the keeper" }).map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
        <button
          type="button"
          className="chrome__menuButton"
          aria-expanded={menuOpen}
          aria-controls="vault-mobile-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="chrome__menuWord">{menuOpen ? "CLOSE" : "MENU"}</span>
          <span
            className={`chrome__menuBars ${menuOpen ? "is-open" : ""}`}
            aria-hidden
          >
            <span />
            <span />
            <span />
          </span>
        </button>
        <div className="chrome__meta">
          HEJNAŁ · TRACKING LIVE
          <br />
          {conferenceCount ?? 0} CONSTELLATIONS · {meetingCount ?? 0} STARS
        </div>
      </nav>

      <div
        id="vault-mobile-nav"
        className={`chrome__overlay ${menuOpen ? "is-open" : ""}`}
      >
        <div className="chrome__overlayInner">
          <div className="chrome__overlayGroup">
            <p className="chrome__overlayLabel">Navigate</p>
            {PRIMARY_NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`chrome__overlayLink ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="chrome__overlayTitle">{item.label}</span>
                  <span className="chrome__overlayMeta">{item.meta}</span>
                </Link>
              )
            })}
          </div>

          <div className="chrome__overlayGroup">
            <p className="chrome__overlayLabel">Context</p>
            {SECONDARY_NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`chrome__overlayLink ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="chrome__overlayTitle">{item.label}</span>
                  <span className="chrome__overlayMeta">{item.meta}</span>
                </Link>
              )
            })}
          </div>

          <p className="chrome__overlayFooter">
            AA principles before personalities.
          </p>
        </div>
      </div>
    </>
  )
}
