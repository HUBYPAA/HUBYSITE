export type RegionKey =
  | "new-england"
  | "mid-atlantic"
  | "southeast"
  | "great-lakes"
  | "plains"
  | "mountain"
  | "pacific"
  | "territories"

export interface RegionConfig {
  key: RegionKey
  label: string
  sortOrder: number
}

export const REGIONS: RegionConfig[] = [
  { key: "new-england", label: "New England", sortOrder: 0 },
  { key: "mid-atlantic", label: "Mid-Atlantic", sortOrder: 1 },
  { key: "southeast", label: "Southeast", sortOrder: 2 },
  { key: "great-lakes", label: "Great Lakes", sortOrder: 3 },
  { key: "plains", label: "Plains", sortOrder: 4 },
  { key: "mountain", label: "Mountain", sortOrder: 5 },
  { key: "pacific", label: "Pacific", sortOrder: 6 },
  { key: "territories", label: "Territories", sortOrder: 7 },
]

export const REGION_MAP: Record<RegionKey, RegionConfig> = Object.fromEntries(
  REGIONS.map((r) => [r.key, r]),
) as Record<RegionKey, RegionConfig>
