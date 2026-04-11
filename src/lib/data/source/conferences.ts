/**
 * Conference source data.
 *
 * No conference data existed in the original states/ folder.
 * This file scaffolds the shape and includes representative entries
 * covering the major YPAA conference landscape — regional conferences,
 * state conferences, and the international gathering. Dates are
 * plausible approximations for the 2025-2026 cycle; all entries are
 * marked "upcoming" with a scaffold note and should be replaced with
 * confirmed details as they become available.
 *
 * Conferences are a core entity type — the architecture supports them
 * fully.
 */

export interface SourceConference {
  name: string
  abbreviation?: string
  state: string
  city: string
  venue?: string
  venueAddress?: string
  startDate: string // ISO date
  endDate: string
  year: number
  registrationUrl?: string
  websiteUrl?: string
  status: "upcoming" | "registration-open" | "completed" | "cancelled"
  price?: string
  organizer?: string
  description?: string
  tags?: string[]
  notes?: string
}

export const SOURCE_CONFERENCES: SourceConference[] = [
  {
    name: "NECYPAA 36",
    abbreviation: "NECYPAA",
    state: "CT",
    city: "Hartford",
    venue: "Hartford Marriott Downtown",
    venueAddress: "200 Columbus Blvd, Hartford, CT 06103",
    startDate: "2026-09-04",
    endDate: "2026-09-07",
    year: 2026,
    status: "upcoming",
    organizer: "NECYPAA Host Committee",
    description: "The 36th annual Northeast Conference of Young People in Alcoholics Anonymous.",
    tags: ["necypaa", "regional", "northeast"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "ICYPAA 63",
    abbreviation: "ICYPAA",
    state: "FL",
    city: "Orlando",
    startDate: "2026-08-27",
    endDate: "2026-08-30",
    year: 2026,
    status: "upcoming",
    organizer: "ICYPAA Advisory Council",
    description: "The International Conference of Young People in AA — the largest annual YPAA gathering.",
    tags: ["icypaa", "international"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "WACYPAA 26",
    abbreviation: "WACYPAA",
    state: "WA",
    city: "Seattle",
    startDate: "2026-06-12",
    endDate: "2026-06-14",
    year: 2026,
    status: "upcoming",
    organizer: "WACYPAA Host Committee",
    description: "The Washington Conference of Young People in AA.",
    tags: ["wacypaa", "state", "pacific"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },

  // --- Regional conferences ---

  {
    name: "ACYPAA 30",
    abbreviation: "ACYPAA",
    state: "VA",
    city: "Virginia Beach",
    startDate: "2025-10-10",
    endDate: "2025-10-12",
    year: 2025,
    status: "upcoming",
    organizer: "ACYPAA Host Committee",
    description:
      "The Atlantic Coast Conference of Young People in AA — a major East Coast regional drawing hundreds of young people from across the Atlantic seaboard.",
    tags: ["acypaa", "regional", "east-coast", "atlantic"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "MACYPAA 22",
    abbreviation: "MACYPAA",
    state: "PA",
    city: "Philadelphia",
    startDate: "2025-11-07",
    endDate: "2025-11-09",
    year: 2025,
    status: "upcoming",
    organizer: "MACYPAA Host Committee",
    description:
      "The Mid-Atlantic Conference of Young People in AA — serving the Mid-Atlantic region with speakers, workshops, and fellowship.",
    tags: ["macypaa", "regional", "mid-atlantic"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "SACYPAA 16",
    abbreviation: "SACYPAA",
    state: "GA",
    city: "Savannah",
    startDate: "2026-03-06",
    endDate: "2026-03-08",
    year: 2026,
    status: "upcoming",
    organizer: "SACYPAA Host Committee",
    description:
      "The Southeast Atlantic Conference of Young People in AA — a growing regional conference connecting young people across the Southeast Atlantic states.",
    tags: ["sacypaa", "regional", "southeast"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "SERCYPAA 28",
    abbreviation: "SERCYPAA",
    state: "TN",
    city: "Nashville",
    startDate: "2025-09-05",
    endDate: "2025-09-07",
    year: 2025,
    status: "upcoming",
    organizer: "SERCYPAA Host Committee",
    description:
      "The Southeast Regional Conference of Young People in AA — one of the longest-running regional YPAA conferences, rotating through cities across the Southeast.",
    tags: ["sercypaa", "regional", "southeast"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "WRCYPAA 15",
    abbreviation: "WRCYPAA",
    state: "CO",
    city: "Denver",
    startDate: "2026-02-13",
    endDate: "2026-02-15",
    year: 2026,
    status: "upcoming",
    organizer: "WRCYPAA Host Committee",
    description:
      "The Western Regional Conference of Young People in AA — bringing together young people from across the Western United States.",
    tags: ["wrcypaa", "regional", "western"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "MWCYPAA 18",
    abbreviation: "MWCYPAA",
    state: "IL",
    city: "Chicago",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    year: 2025,
    status: "upcoming",
    organizer: "MWCYPAA Host Committee",
    description:
      "The Midwest Conference of Young People in AA — a regional gathering for young people across the Midwest states.",
    tags: ["mwcypaa", "regional", "midwest"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },

  // --- State conferences ---

  {
    name: "SCYPAA 34",
    abbreviation: "SCYPAA",
    state: "CA",
    city: "Los Angeles",
    startDate: "2025-07-18",
    endDate: "2025-07-20",
    year: 2025,
    status: "upcoming",
    organizer: "SCYPAA Host Committee",
    description:
      "The Southern California Conference of Young People in AA — one of the most well-attended state-level YPAA conferences in the country.",
    tags: ["scypaa", "state", "california", "socal"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "NYCYPAA 40",
    abbreviation: "NYCYPAA",
    state: "NY",
    city: "New York",
    venue: "New Yorker Hotel",
    venueAddress: "481 Eighth Ave, New York, NY 10001",
    startDate: "2025-12-05",
    endDate: "2025-12-07",
    year: 2025,
    status: "upcoming",
    organizer: "NYCYPAA Host Committee",
    description:
      "The New York Conference of Young People in AA — a long-running city conference with deep roots in NYC's vibrant AA community.",
    tags: ["nycypaa", "state", "new-york", "northeast"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "PENNYPAA 19",
    abbreviation: "PENNYPAA",
    state: "PA",
    city: "Pittsburgh",
    startDate: "2026-04-24",
    endDate: "2026-04-26",
    year: 2026,
    status: "upcoming",
    organizer: "PENNYPAA Host Committee",
    description:
      "The Pennsylvania Conference of Young People in AA — rotating annually through Pennsylvania cities.",
    tags: ["pennypaa", "state", "pennsylvania", "mid-atlantic"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "MSCYPAA 21",
    abbreviation: "MSCYPAA",
    state: "MA",
    city: "Worcester",
    startDate: "2026-01-16",
    endDate: "2026-01-18",
    year: 2026,
    status: "upcoming",
    organizer: "MSCYPAA Host Committee",
    description:
      "The Massachusetts Conference of Young People in AA — a weekend of speakers, workshops, and fellowship for young people in recovery across Massachusetts.",
    tags: ["mscypaa", "state", "massachusetts", "new-england"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
  {
    name: "CSCYPAA 12",
    abbreviation: "CSCYPAA",
    state: "CT",
    city: "New Haven",
    startDate: "2025-10-24",
    endDate: "2025-10-26",
    year: 2025,
    status: "upcoming",
    organizer: "CSCYPAA Host Committee",
    description:
      "The Connecticut State Conference of Young People in AA — a statewide gathering building community among Connecticut's young people in recovery.",
    tags: ["cscypaa", "state", "connecticut", "new-england"],
    notes: "Scaffold entry — replace with confirmed details when available.",
  },
]
