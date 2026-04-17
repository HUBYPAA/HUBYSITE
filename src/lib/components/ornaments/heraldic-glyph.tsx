import type { SVGProps } from "react"

type GlyphName =
  | "shield-cross"      // Meetings — Krakow civic shield
  | "star-diamond"      // Conferences — stellar vault boss
  | "open-book"         // About / What Is YPAA — prayer-text panel
  | "winged-shield"     // Safety — Guardian Angels chapel
  | "quill-key"         // Submit — scribal guild
  | "tower-gothic"      // North tower — Gothic spire
  | "tower-renaissance" // South tower — Renaissance dome
  | "crown"             // 1666 gilded crown
  | "star-eight"        // 8-point star
  | "filigree"          // ornate divider center
  | "diamond-pip"       // metadata separator

export function HeraldicGlyph({
  name,
  className = "",
  ...rest
}: { name: GlyphName; className?: string } & Omit<SVGProps<SVGSVGElement>, "children">) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
    ...rest,
  }

  switch (name) {
    case "shield-cross":
      return (
        <svg {...common}>
          <path d="M12 2.6 4.5 5v7c0 4.6 3 8 7.5 9.4C16.5 20 19.5 16.6 19.5 12V5z" />
          <path d="M12 7v10" />
          <path d="M7.5 11.5h9" />
        </svg>
      )
    case "star-diamond":
      return (
        <svg {...common}>
          <path d="M12 2 22 12 12 22 2 12z" />
          <path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8" strokeWidth={0.9} />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case "open-book":
      return (
        <svg {...common}>
          <path d="M3 5.5C7 5.5 9.5 6.5 12 8c2.5-1.5 5-2.5 9-2.5v12c-4 0-6.5 1-9 2.5-2.5-1.5-5-2.5-9-2.5z" />
          <path d="M12 8v11" />
          <path d="M12 19c.6-2 1.6-2.6 3-2.6" strokeWidth={0.9} />
        </svg>
      )
    case "winged-shield":
      return (
        <svg {...common}>
          <path d="M12 5 7.5 6.4v5c0 3.4 2.1 5.8 4.5 7 2.4-1.2 4.5-3.6 4.5-7v-5z" />
          <path d="M7.5 7c-2 .4-4 1.6-5 3.6 1.6.4 3.4-.2 5-1.6" />
          <path d="M16.5 7c2 .4 4 1.6 5 3.6-1.6.4-3.4-.2-5-1.6" />
          <circle cx="12" cy="11.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case "quill-key":
      return (
        <svg {...common}>
          <path d="M5 19 14 10c1-1 1.5-2.4 1.4-3.8L19 3" />
          <path d="m6.5 17.5 2 2" />
          <circle cx="17.5" cy="17.5" r="2.4" />
          <path d="M15.4 19.5h-3M14 17.5h-2" />
        </svg>
      )
    case "tower-gothic":
      return (
        <svg {...common}>
          <path d="M12 2 9.5 5.5h5z" />
          <path d="M11 5.5h2v2h-2z" />
          <path d="M10 7.5h4v3h-4zM9 10.5h6v10.5H9z" />
          <path d="M11 14h2v3h-2z" fill="currentColor" />
        </svg>
      )
    case "tower-renaissance":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="3.5" ry="2" />
          <path d="M9.5 7.5h5v2h-5z" />
          <path d="M9 10h6v11H9z" />
          <path d="M11 14h2v3h-2z" fill="currentColor" />
        </svg>
      )
    case "crown":
      return (
        <svg {...common}>
          <path d="M3 9 6 15h12l3-6-4 3-3-5-2 5-2-5-3 5z" />
          <path d="M6 17h12" />
        </svg>
      )
    case "star-eight":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 1 13.6 9 22 12 13.6 14.4 12 23 10.4 14.4 2 12 10.4 9z" />
          <path d="M12 5.5 13 11l4.5 1L13 13l-1 5.5-1-5.5L6.5 12 11 11z" fill="rgba(255,255,255,0.18)" />
        </svg>
      )
    case "filigree":
      return (
        <svg viewBox="0 0 96 12" className={className} fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" aria-hidden>
          <path d="M2 6c8 0 10-3 14-3s6 3 14 3" />
          <path d="M94 6c-8 0-10-3-14-3s-6 3-14 3" />
          <path d="M48 1.6 49.4 5.2 53 6 49.4 6.8 48 10.4 46.6 6.8 43 6 46.6 5.2z" fill="currentColor" stroke="none" />
          <circle cx="32" cy="6" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="64" cy="6" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      )
    case "diamond-pip":
      return (
        <svg viewBox="0 0 8 8" className={className} fill="currentColor" stroke="none" aria-hidden>
          <path d="M4 0.6 7.4 4 4 7.4.6 4z" />
        </svg>
      )
  }
}

export type { GlyphName }
