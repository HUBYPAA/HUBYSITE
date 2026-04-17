"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HeraldicGlyph, type GlyphName } from "@/lib/components/ornaments/heraldic-glyph"

const TABS: { href: string; label: string; glyph: GlyphName }[] = [
  { href: "/", label: "home", glyph: "crown" },
  { href: "/meetings", label: "meetings", glyph: "shield-cross" },
  { href: "/conferences", label: "events", glyph: "star-diamond" },
  { href: "/submit", label: "submit", glyph: "quill-key" },
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
              <HeraldicGlyph
                name={tab.glyph}
                className={`h-5 w-5 ${active ? "text-[var(--color-gilt)]" : "text-[rgba(241,233,214,0.55)]"}`}
              />
              <span>{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
