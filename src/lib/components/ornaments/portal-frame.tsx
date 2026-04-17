import type { ReactNode } from "react"
import { HeraldicGlyph } from "./heraldic-glyph"

interface PortalFrameProps {
  children: ReactNode
  className?: string
}

/**
 * The threshold. Narrower than the rest of the page, with a pointed
 * Gothic arch SVG above the content. You read "through a doorway"
 * before the nave opens up.
 */
export function PortalFrame({ children, className = "" }: PortalFrameProps) {
  return (
    <div className={`portal-frame ${className}`}>
      {/* Pointed arch above */}
      <svg
        viewBox="0 0 320 80"
        className="mx-auto block w-full max-w-[18rem]"
        aria-hidden
      >
        <defs>
          <linearGradient id="portalArch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gilt-shadow)" stopOpacity="0" />
            <stop offset="60%" stopColor="var(--color-gilt-shadow)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-gilt)" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Outer ogee arch */}
        <path
          d="M 8 78 L 8 50 Q 8 28 40 16 Q 100 -10 160 4 Q 220 -10 280 16 Q 312 28 312 50 L 312 78"
          fill="none"
          stroke="url(#portalArch)"
          strokeWidth="0.9"
        />
        {/* Inner arch (drip cornice) */}
        <path
          d="M 18 78 L 18 52 Q 18 34 46 24 Q 100 4 160 14 Q 220 4 274 24 Q 302 34 302 52 L 302 78"
          fill="none"
          stroke="var(--color-gilt-shadow)"
          strokeOpacity="0.5"
          strokeWidth="0.6"
        />
        {/* Keystone star */}
        <g transform="translate(160 12)">
          <path
            d="M0 -7 L1.4 -1.4 L7 0 L1.4 1.4 L0 7 L-1.4 1.4 L-7 0 L-1.4 -1.4 Z"
            fill="var(--color-gilt)"
          />
        </g>
      </svg>

      <div className="mt-4">{children}</div>

      {/* Tower-cap microsignature — Gothic crown */}
      <div className="mt-6 flex items-center justify-center gap-3 text-[var(--color-gilt-shadow)]">
        <HeraldicGlyph name="tower-gothic" className="h-3 w-3 opacity-70" />
        <HeraldicGlyph name="crown" className="h-3 w-3" />
        <HeraldicGlyph name="tower-renaissance" className="h-3 w-3 opacity-70" />
      </div>
    </div>
  )
}
