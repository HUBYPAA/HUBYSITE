import type { ReactNode } from "react"
import { StarryCanopy } from "./starry-canopy"
import { FiligreeRule } from "./filigree-rule"
import { HeraldicGlyph, type GlyphName } from "./heraldic-glyph"

interface PortalHeaderProps {
  glyph: GlyphName
  kicker: string
  title: ReactNode
  subtitle?: string
  /** Skip the starry ribbon (e.g., when the page wants its own atmosphere) */
  withRibbon?: boolean
  /** Ribbon RNG seed — same seed = same sky between visits */
  ribbonSeed?: number
}

/**
 * Standard threshold for every secondary page.
 * Starry ribbon → filigree rule → kicker → display title → italic subtitle → filigree rule.
 * Same architectural grammar as the home portal, smaller stage.
 */
export function PortalHeader({
  glyph,
  kicker,
  title,
  subtitle,
  withRibbon = true,
  ribbonSeed = 19,
}: PortalHeaderProps) {
  return (
    <div>
      {withRibbon ? <StarryCanopy variant="ribbon" seed={ribbonSeed} /> : null}

      <div className="site-shell mt-6">
        <FiligreeRule tone="shadow" />
      </div>

      <div className="site-shell mt-8 text-center sm:mt-12">
        <span className="section-kicker inline-flex">
          <HeraldicGlyph name={glyph} />
          {kicker}
        </span>
        <h1 className="page-title mt-5 mx-auto max-w-4xl">{title}</h1>
        {subtitle ? (
          <p className="page-subtitle mt-5 mx-auto max-w-2xl">
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="site-shell mt-8">
        <FiligreeRule tone="shadow" />
      </div>
    </div>
  )
}
