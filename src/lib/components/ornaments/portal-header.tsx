import type { ReactNode } from "react"
import { FiligreeRule } from "./filigree-rule"
import { HeraldicGlyph, type GlyphName } from "./heraldic-glyph"

interface PortalHeaderProps {
  glyph: GlyphName
  kicker: string
  title: ReactNode
  subtitle?: string
  /**
   * @deprecated Kept for prop-compat. Ignored: the persistent VaultSky
   * now provides the starry ceiling for every interior page.
   */
  withRibbon?: boolean
  /**
   * @deprecated Kept for prop-compat. Ignored: the persistent VaultSky
   * uses a single stable seed.
   */
  ribbonSeed?: number
}

/**
 * Standard threshold for every secondary page.
 *
 * Sits under the persistent vault sky — kicker in gilt, title in ivory,
 * subtitle in gilt-soft italic. The sky above provides the atmosphere;
 * this header is just the inscription below the stars.
 */
export function PortalHeader({
  glyph,
  kicker,
  title,
  subtitle,
}: PortalHeaderProps) {
  return (
    <div className="portal-inscription">
      <div className="site-shell text-center">
        <span className="portal-inscription__kicker">
          <HeraldicGlyph name={glyph} />
          {kicker}
        </span>
        <h1 className="portal-inscription__title">{title}</h1>
        {subtitle ? (
          <p className="portal-inscription__subtitle">{subtitle}</p>
        ) : null}
      </div>

      <div className="site-shell mt-8">
        <FiligreeRule tone="gilt" />
      </div>
    </div>
  )
}
