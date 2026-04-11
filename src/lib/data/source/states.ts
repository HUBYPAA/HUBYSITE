import type { RegionKey } from "./regions"

export interface Intergroup {
  name: string
  url: string
  area?: string
}

export interface YPAACommittee {
  name: string
  url: string
}

export interface StateResource {
  name: string
  abbreviation: string
  region: RegionKey
  flagSvg?: string
  intergroups: Intergroup[]
  areaServiceUrl: string
  ypaaCommittee: YPAACommittee
  notes?: string
}

export const MEMBER_STATES: StateResource[] = [
  // ─── New England ──────────────────────────────────────────────────
  {
    name: "Connecticut",
    abbreviation: "CT",
    region: "new-england",
    flagSvg: "/images/flags/ct.svg",
    intergroups: [
      { name: "Connecticut Area Intergroup", url: "https://ct-aa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.ct-aa.org/",
    ypaaCommittee: { name: "Connecticut YPAA (CTYPAA)", url: "https://www.ctypaa.org/" },
  },
  {
    name: "Maine",
    abbreviation: "ME",
    region: "new-england",
    flagSvg: "/images/flags/me.svg",
    intergroups: [
      { name: "Maine Area Intergroup", url: "https://www.maineaa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.maineaa.org/",
    ypaaCommittee: { name: "Maine YPAA (MEYPAA)", url: "https://meypaa.org/" },
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
    region: "new-england",
    flagSvg: "/images/flags/ma.svg",
    intergroups: [
      { name: "Greater Boston AA Intergroup", url: "https://aaboston.org/", area: "Greater Boston" },
      { name: "Western Massachusetts Intergroup", url: "https://www.westernmassaa.org/", area: "Western MA" },
      { name: "South Shore Intergroup", url: "https://aasouthshore.org/", area: "South Shore" },
    ],
    areaServiceUrl: "https://aaemass.org/",
    ypaaCommittee: { name: "Massachusetts YPAA (MAYPAA)", url: "https://maypaa.org/" },
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
    region: "new-england",
    flagSvg: "/images/flags/nh.svg",
    intergroups: [
      { name: "New Hampshire AA", url: "https://nhaa.net/", area: "Statewide" },
    ],
    areaServiceUrl: "https://nhaa.net/",
    ypaaCommittee: { name: "New Hampshire YPAA (NHYPAA)", url: "https://nhypaa.org/" },
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
    region: "new-england",
    flagSvg: "/images/flags/ri.svg",
    intergroups: [
      { name: "Rhode Island Intergroup", url: "https://www.aainri.com/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.aainri.com/",
    ypaaCommittee: { name: "Rhode Island YPAA (RIYPAA)", url: "https://riypaa.org/" },
  },
  {
    name: "Vermont",
    abbreviation: "VT",
    region: "new-england",
    flagSvg: "/images/flags/vt.svg",
    intergroups: [
      { name: "Vermont AA", url: "https://aavt.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://aavt.org/",
    ypaaCommittee: { name: "Vermont YPAA (VTYPAA)", url: "https://vtypaa.org/" },
  },

  // ─── Mid-Atlantic ─────────────────────────────────────────────────
  {
    name: "Delaware",
    abbreviation: "DE",
    region: "mid-atlantic",
    flagSvg: "/images/flags/de.svg",
    intergroups: [
      { name: "Delaware Intergroup", url: "https://www.delaa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.delaa.org/",
    ypaaCommittee: { name: "Delaware YPAA (DEYPAA)", url: "https://deypaa.org/" },
  },
  {
    name: "Maryland",
    abbreviation: "MD",
    region: "mid-atlantic",
    flagSvg: "/images/flags/md.svg",
    intergroups: [
      { name: "Baltimore Intergroup", url: "https://www.baltimoreaa.org/", area: "Baltimore Metro" },
      { name: "Maryland General Service", url: "https://www.marylandaa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.marylandaa.org/",
    ypaaCommittee: { name: "Maryland YPAA (MDYPAA)", url: "https://mdypaa.org/" },
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
    region: "mid-atlantic",
    flagSvg: "/images/flags/nj.svg",
    intergroups: [
      { name: "Northern New Jersey Intergroup", url: "https://www.nnjaa.org/", area: "Northern NJ" },
      { name: "Central NJ Intergroup", url: "https://www.cnjintergroup.org/", area: "Central NJ" },
      { name: "South Jersey Intergroup", url: "https://www.aasj.org/", area: "Southern NJ" },
    ],
    areaServiceUrl: "https://www.nnjaa.org/",
    ypaaCommittee: { name: "New Jersey YPAA (NJYPAA)", url: "https://njypaa.org/" },
  },
  {
    name: "New York",
    abbreviation: "NY",
    region: "mid-atlantic",
    flagSvg: "/images/flags/ny.svg",
    intergroups: [
      { name: "New York Intergroup (Manhattan)", url: "https://www.nyintergroup.org/", area: "New York City" },
      { name: "Nassau Intergroup", url: "https://www.nassauny-aa.org/", area: "Long Island" },
      { name: "Hudson Mohawk Berkshire Intergroup", url: "https://aahmbny.org/", area: "Capital Region" },
    ],
    areaServiceUrl: "https://www.nyintergroup.org/",
    ypaaCommittee: { name: "New York YPAA (NYCYPAA)", url: "https://nycypaa.org/" },
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
    region: "mid-atlantic",
    flagSvg: "/images/flags/pa.svg",
    intergroups: [
      { name: "Philadelphia Intergroup", url: "https://www.aasepia.org/", area: "Southeastern PA" },
      { name: "Pittsburgh Central Office", url: "https://www.aapittsburgh.org/", area: "Western PA" },
    ],
    areaServiceUrl: "https://www.aasepia.org/",
    ypaaCommittee: { name: "Pennsylvania YPAA (PAYPAA)", url: "https://paypaa.org/" },
  },
  {
    name: "Washington, D.C.",
    abbreviation: "DC",
    region: "mid-atlantic",
    flagSvg: "/images/flags/dc.svg",
    intergroups: [
      { name: "Washington Area Intergroup (WAIA)", url: "https://www.aa-dc.org/", area: "DC Metro" },
    ],
    areaServiceUrl: "https://www.aa-dc.org/",
    ypaaCommittee: { name: "DC YPAA (DCYPAA)", url: "https://dcypaa.org/" },
    notes: "District of Columbia — not a state, but a full member.",
  },

  // ─── Southeast ────────────────────────────────────────────────────
  {
    name: "Alabama",
    abbreviation: "AL",
    region: "southeast",
    intergroups: [
      { name: "Birmingham Area Intergroup", url: "https://www.aabirmingham.org/", area: "Birmingham Metro" },
    ],
    areaServiceUrl: "https://www.aabirmingham.org/",
    ypaaCommittee: { name: "Alabama YPAA (ALYPAA)", url: "https://alypaa.org/" },
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
    region: "southeast",
    intergroups: [
      { name: "Central Arkansas Intergroup", url: "https://www.centralar-aa.org/", area: "Central AR" },
    ],
    areaServiceUrl: "https://www.arkansasaa.org/",
    ypaaCommittee: { name: "Arkansas YPAA (ARYPAA)", url: "https://arypaa.org/" },
  },
  {
    name: "Florida",
    abbreviation: "FL",
    region: "southeast",
    intergroups: [
      { name: "South Florida Intergroup", url: "https://aasfintergroup.org/", area: "South FL" },
      { name: "Central Florida Intergroup", url: "https://www.cflintergroup.org/", area: "Central FL" },
      { name: "North Florida Intergroup", url: "https://www.jaxaa.org/", area: "Jacksonville Area" },
    ],
    areaServiceUrl: "https://aasfintergroup.org/",
    ypaaCommittee: { name: "Florida YPAA (FLORIDAYPAA)", url: "https://floridaypaa.org/" },
  },
  {
    name: "Georgia",
    abbreviation: "GA",
    region: "southeast",
    intergroups: [
      { name: "Atlanta Central Office", url: "https://www.atlantaaa.org/", area: "Metro Atlanta" },
    ],
    areaServiceUrl: "https://www.atlantaaa.org/",
    ypaaCommittee: { name: "Georgia YPAA (GAYPAA)", url: "https://gaypaa.org/" },
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
    region: "southeast",
    intergroups: [
      { name: "Louisville Central Office", url: "https://www.louisvilleaa.org/", area: "Louisville Area" },
      { name: "Lexington Intergroup", url: "https://www.lexingtonaa.org/", area: "Lexington Area" },
    ],
    areaServiceUrl: "https://www.louisvilleaa.org/",
    ypaaCommittee: { name: "Kentucky YPAA (KYPAA)", url: "https://kypaa.org/" },
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
    region: "southeast",
    intergroups: [
      { name: "Greater New Orleans AA Intergroup", url: "https://www.aaneworleans.org/", area: "New Orleans Area" },
    ],
    areaServiceUrl: "https://www.aaneworleans.org/",
    ypaaCommittee: { name: "Louisiana YPAA (LAYPAA)", url: "https://laypaa.org/" },
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
    region: "southeast",
    intergroups: [
      { name: "Mississippi AA", url: "https://www.aa-mississippi.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.aa-mississippi.org/",
    ypaaCommittee: { name: "Mississippi YPAA (MSYPAA)", url: "https://msypaa.org/" },
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
    region: "southeast",
    intergroups: [
      { name: "Triangle Intergroup (Raleigh-Durham)", url: "https://www.aatriangle.org/", area: "Triangle Area" },
      { name: "Charlotte Area Intergroup", url: "https://www.charlotteaa.org/", area: "Charlotte Area" },
    ],
    areaServiceUrl: "https://www.aatriangle.org/",
    ypaaCommittee: { name: "North Carolina YPAA (NCYPAA)", url: "https://ncypaa.org/" },
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
    region: "southeast",
    intergroups: [
      { name: "Charleston Intergroup", url: "https://www.charlestonaa.com/", area: "Charleston Area" },
    ],
    areaServiceUrl: "https://www.charlestonaa.com/",
    ypaaCommittee: { name: "South Carolina YPAA (SCYPAA)", url: "https://scypaa.org/" },
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
    region: "southeast",
    intergroups: [
      { name: "Nashville Central Office", url: "https://www.aanashville.org/", area: "Nashville Area" },
      { name: "Memphis Area Intergroup", url: "https://www.aamemphis.org/", area: "Memphis Area" },
    ],
    areaServiceUrl: "https://www.aanashville.org/",
    ypaaCommittee: { name: "Tennessee YPAA (TNYPAA)", url: "https://tnypaa.org/" },
  },
  {
    name: "Virginia",
    abbreviation: "VA",
    region: "southeast",
    intergroups: [
      { name: "Northern Virginia Intergroup", url: "https://www.nvintergroup.org/", area: "Northern VA" },
      { name: "Richmond Intergroup", url: "https://www.aarichmond.org/", area: "Richmond Area" },
    ],
    areaServiceUrl: "https://www.nvintergroup.org/",
    ypaaCommittee: { name: "Virginia YPAA (VAYPAA)", url: "https://vaypaa.org/" },
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
    region: "southeast",
    intergroups: [
      { name: "Kanawha Valley Intergroup", url: "https://www.aawv.org/", area: "Charleston Area" },
    ],
    areaServiceUrl: "https://www.aawv.org/",
    ypaaCommittee: { name: "West Virginia YPAA (WVYPAA)", url: "https://wvypaa.org/" },
  },

  // ─── Great Lakes ──────────────────────────────────────────────────
  {
    name: "Illinois",
    abbreviation: "IL",
    region: "great-lakes",
    intergroups: [
      { name: "Chicago Area Service Office", url: "https://www.chicagoaa.org/", area: "Chicago Metro" },
    ],
    areaServiceUrl: "https://www.chicagoaa.org/",
    ypaaCommittee: { name: "Illinois YPAA (ILYPAA)", url: "https://ilypaa.org/" },
  },
  {
    name: "Indiana",
    abbreviation: "IN",
    region: "great-lakes",
    intergroups: [
      { name: "Indianapolis Central Office", url: "https://www.indyaa.org/", area: "Indianapolis Area" },
    ],
    areaServiceUrl: "https://www.indyaa.org/",
    ypaaCommittee: { name: "Indiana YPAA (INYPAA)", url: "https://inypaa.org/" },
  },
  {
    name: "Michigan",
    abbreviation: "MI",
    region: "great-lakes",
    intergroups: [
      { name: "Detroit Central Office", url: "https://www.aadestroitia.org/", area: "Detroit Metro" },
      { name: "West Michigan Intergroup", url: "https://www.grandrapidsaa.org/", area: "Grand Rapids Area" },
    ],
    areaServiceUrl: "https://www.aadestroitia.org/",
    ypaaCommittee: { name: "Michigan YPAA (MIYPAA)", url: "https://miypaa.org/" },
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
    region: "great-lakes",
    intergroups: [
      { name: "Minneapolis Intergroup", url: "https://www.aaminneapolis.org/", area: "Minneapolis Area" },
      { name: "St. Paul Intergroup", url: "https://www.aastpaul.org/", area: "St. Paul Area" },
    ],
    areaServiceUrl: "https://www.aaminneapolis.org/",
    ypaaCommittee: { name: "Minnesota YPAA (MNYPAA)", url: "https://mnypaa.org/" },
  },
  {
    name: "Ohio",
    abbreviation: "OH",
    region: "great-lakes",
    intergroups: [
      { name: "Cleveland District Office", url: "https://www.clevelandaa.org/", area: "Cleveland Area" },
      { name: "Columbus Area Intergroup", url: "https://www.aacentraloh.org/", area: "Columbus Area" },
      { name: "Cincinnati Intergroup", url: "https://www.aacincinnati.org/", area: "Cincinnati Area" },
    ],
    areaServiceUrl: "https://www.clevelandaa.org/",
    ypaaCommittee: { name: "Ohio YPAA (OYPAA)", url: "https://oypaa.org/" },
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
    region: "great-lakes",
    intergroups: [
      { name: "Milwaukee Central Office", url: "https://www.aa-milwaukee.org/", area: "Milwaukee Area" },
      { name: "Madison Area Intergroup", url: "https://www.aamadison.org/", area: "Madison Area" },
    ],
    areaServiceUrl: "https://www.aa-milwaukee.org/",
    ypaaCommittee: { name: "Wisconsin YPAA (WIYPAA)", url: "https://wiypaa.org/" },
  },

  // ─── Plains ───────────────────────────────────────────────────────
  {
    name: "Iowa",
    abbreviation: "IA",
    region: "plains",
    intergroups: [
      { name: "Des Moines Intergroup", url: "https://www.desmoinesia.org/", area: "Des Moines Area" },
    ],
    areaServiceUrl: "https://www.aa-iowa.org/",
    ypaaCommittee: { name: "Iowa YPAA (IAYPAA)", url: "https://iaypaa.org/" },
  },
  {
    name: "Kansas",
    abbreviation: "KS",
    region: "plains",
    intergroups: [
      { name: "Wichita Central Office", url: "https://www.aawichita.org/", area: "Wichita Area" },
    ],
    areaServiceUrl: "https://www.aawichita.org/",
    ypaaCommittee: { name: "Kansas YPAA (KSYPAA)", url: "https://ksypaa.org/" },
  },
  {
    name: "Missouri",
    abbreviation: "MO",
    region: "plains",
    intergroups: [
      { name: "St. Louis Central Office", url: "https://www.aastl.org/", area: "St. Louis Area" },
      { name: "Kansas City Intergroup", url: "https://www.kc-aa.org/", area: "Kansas City Area" },
    ],
    areaServiceUrl: "https://www.aastl.org/",
    ypaaCommittee: { name: "Missouri YPAA (MOYPAA)", url: "https://moypaa.org/" },
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
    region: "plains",
    intergroups: [
      { name: "Omaha Central Office", url: "https://www.omahaaa.org/", area: "Omaha Area" },
    ],
    areaServiceUrl: "https://www.omahaaa.org/",
    ypaaCommittee: { name: "Nebraska YPAA (NEYPAA)", url: "https://neypaa.org/" },
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
    region: "plains",
    intergroups: [
      { name: "North Dakota AA", url: "https://www.aanorthdakota.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.aanorthdakota.org/",
    ypaaCommittee: { name: "North Dakota YPAA (NDYPAA)", url: "https://ndypaa.org/" },
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
    region: "plains",
    intergroups: [
      { name: "Oklahoma City Intergroup", url: "https://www.okcintergroup.org/", area: "Oklahoma City Area" },
      { name: "Tulsa Central Office", url: "https://www.tulsaaa.org/", area: "Tulsa Area" },
    ],
    areaServiceUrl: "https://www.okcintergroup.org/",
    ypaaCommittee: { name: "Oklahoma YPAA (OKYPAA)", url: "https://okypaa.org/" },
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
    region: "plains",
    intergroups: [
      { name: "South Dakota AA", url: "https://www.area63aa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.area63aa.org/",
    ypaaCommittee: { name: "South Dakota YPAA (SDYPAA)", url: "https://sdypaa.org/" },
  },
  {
    name: "Texas",
    abbreviation: "TX",
    region: "plains",
    intergroups: [
      { name: "Houston Intergroup", url: "https://www.aahouston.org/", area: "Houston Area" },
      { name: "Dallas Central Office", url: "https://www.aadallas.org/", area: "Dallas Area" },
      { name: "San Antonio Central Office", url: "https://www.aasanantonio.org/", area: "San Antonio Area" },
      { name: "Austin Intergroup", url: "https://www.austinaa.org/", area: "Austin Area" },
    ],
    areaServiceUrl: "https://www.aahouston.org/",
    ypaaCommittee: { name: "Texas YPAA (TXYPAA)", url: "https://texasypaa.org/" },
  },

  // ─── Mountain ─────────────────────────────────────────────────────
  {
    name: "Arizona",
    abbreviation: "AZ",
    region: "mountain",
    intergroups: [
      { name: "Phoenix Central Office", url: "https://www.aaphoenix.org/", area: "Phoenix Area" },
      { name: "Tucson Intergroup", url: "https://www.aatucson.org/", area: "Tucson Area" },
    ],
    areaServiceUrl: "https://www.aaphoenix.org/",
    ypaaCommittee: { name: "Arizona YPAA (AZYPAA)", url: "https://azypaa.org/" },
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    region: "mountain",
    intergroups: [
      { name: "Denver Central Office", url: "https://www.denvercentraloffice.org/", area: "Denver Metro" },
      { name: "Colorado Springs Central Office", url: "https://www.coloradospringsaa.org/", area: "Colorado Springs Area" },
    ],
    areaServiceUrl: "https://www.denvercentraloffice.org/",
    ypaaCommittee: { name: "Colorado YPAA (COYPAA)", url: "https://coypaa.org/" },
  },
  {
    name: "Idaho",
    abbreviation: "ID",
    region: "mountain",
    intergroups: [
      { name: "Idaho Area AA", url: "https://www.idahoarea18aa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.idahoarea18aa.org/",
    ypaaCommittee: { name: "Idaho YPAA (IDYPAA)", url: "https://idypaa.org/" },
  },
  {
    name: "Montana",
    abbreviation: "MT",
    region: "mountain",
    intergroups: [
      { name: "Montana AA", url: "https://www.aa-montana.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.aa-montana.org/",
    ypaaCommittee: { name: "Montana YPAA (MTYPAA)", url: "https://mtypaa.org/" },
  },
  {
    name: "Nevada",
    abbreviation: "NV",
    region: "mountain",
    intergroups: [
      { name: "Las Vegas Central Office", url: "https://www.lvcentraloffice.org/", area: "Las Vegas Area" },
    ],
    areaServiceUrl: "https://www.lvcentraloffice.org/",
    ypaaCommittee: { name: "Nevada YPAA (NVYPAA)", url: "https://nvypaa.org/" },
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
    region: "mountain",
    intergroups: [
      { name: "Albuquerque Central Office", url: "https://www.albuquerqueaa.org/", area: "Albuquerque Area" },
    ],
    areaServiceUrl: "https://www.albuquerqueaa.org/",
    ypaaCommittee: { name: "New Mexico YPAA (NMYPAA)", url: "https://nmypaa.org/" },
  },
  {
    name: "Utah",
    abbreviation: "UT",
    region: "mountain",
    intergroups: [
      { name: "Salt Lake Central Office", url: "https://www.slcintergroup.org/", area: "Salt Lake City Area" },
    ],
    areaServiceUrl: "https://www.slcintergroup.org/",
    ypaaCommittee: { name: "Utah YPAA (UTYPAA)", url: "https://utypaa.org/" },
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
    region: "mountain",
    intergroups: [
      { name: "Wyoming AA", url: "https://www.wyomingaa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.wyomingaa.org/",
    ypaaCommittee: { name: "Wyoming YPAA (WYYPAA)", url: "https://wyypaa.org/" },
  },

  // ─── Pacific ──────────────────────────────────────────────────────
  {
    name: "Alaska",
    abbreviation: "AK",
    region: "pacific",
    intergroups: [
      { name: "Anchorage Central Office", url: "https://www.area02aa.org/", area: "Anchorage Area" },
    ],
    areaServiceUrl: "https://www.area02aa.org/",
    ypaaCommittee: { name: "Alaska YPAA (AKYPAA)", url: "https://akypaa.org/" },
  },
  {
    name: "California",
    abbreviation: "CA",
    region: "pacific",
    intergroups: [
      { name: "Los Angeles Central Office", url: "https://www.lacoaa.org/", area: "Los Angeles Area" },
      { name: "San Francisco Central Office", url: "https://www.aasf.org/", area: "San Francisco Area" },
      { name: "San Diego Central Office", url: "https://www.aasandiego.org/", area: "San Diego Area" },
    ],
    areaServiceUrl: "https://www.lacoaa.org/",
    ypaaCommittee: { name: "California YPAA (CALYPAA)", url: "https://calypaa.org/" },
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
    region: "pacific",
    intergroups: [
      { name: "Hawaii Area AA", url: "https://www.area17aa.org/", area: "Statewide" },
    ],
    areaServiceUrl: "https://www.area17aa.org/",
    ypaaCommittee: { name: "Hawaii YPAA (HIYPAA)", url: "https://hiypaa.org/" },
  },
  {
    name: "Oregon",
    abbreviation: "OR",
    region: "pacific",
    intergroups: [
      { name: "Portland Area Intergroup", url: "https://www.portlandareaintergroup.org/", area: "Portland Area" },
    ],
    areaServiceUrl: "https://www.portlandareaintergroup.org/",
    ypaaCommittee: { name: "Oregon YPAA (ORYPAA)", url: "https://orypaa.org/" },
  },
  {
    name: "Washington",
    abbreviation: "WA",
    region: "pacific",
    intergroups: [
      { name: "Seattle Intergroup", url: "https://www.seattleaa.org/", area: "Seattle Area" },
    ],
    areaServiceUrl: "https://www.area72aa.org/",
    ypaaCommittee: { name: "Washington YPAA (WAYPAA)", url: "https://waypaa.org/" },
  },

  // ─── US Territories ───────────────────────────────────────────────
  {
    name: "Puerto Rico",
    abbreviation: "PR",
    region: "territories",
    intergroups: [
      { name: "Oficina de Servicios Generales de AA en Puerto Rico", url: "https://www.aapr.org/", area: "Island-wide" },
    ],
    areaServiceUrl: "https://www.aapr.org/",
    ypaaCommittee: { name: "Puerto Rico YPAA (PRYPAA)", url: "https://prypaa.org/" },
    notes: "US Territory. Many meetings in Spanish.",
  },
  {
    name: "US Virgin Islands",
    abbreviation: "VI",
    region: "territories",
    intergroups: [
      { name: "Virgin Islands Intergroup", url: "https://www.aa.org/", area: "Island-wide" },
    ],
    areaServiceUrl: "https://www.aa.org/",
    ypaaCommittee: { name: "Virgin Islands YPAA (VIYPAA)", url: "https://viypaa.org/" },
    notes: "US Territory.",
  },
  {
    name: "Guam",
    abbreviation: "GU",
    region: "territories",
    intergroups: [
      { name: "Guam AA", url: "https://www.aa.org/", area: "Island-wide" },
    ],
    areaServiceUrl: "https://www.aa.org/",
    ypaaCommittee: { name: "Guam YPAA (GUYPAA)", url: "https://guypaa.org/" },
    notes: "US Territory.",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
    region: "territories",
    intergroups: [
      { name: "American Samoa AA", url: "https://www.aa.org/", area: "Island-wide" },
    ],
    areaServiceUrl: "https://www.aa.org/",
    ypaaCommittee: { name: "American Samoa YPAA (ASYPAA)", url: "https://asypaa.org/" },
    notes: "US Territory.",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
    region: "territories",
    intergroups: [
      { name: "CNMI AA", url: "https://www.aa.org/", area: "Island-wide" },
    ],
    areaServiceUrl: "https://www.aa.org/",
    ypaaCommittee: { name: "Northern Mariana Islands YPAA (MPYPAA)", url: "https://mpypaa.org/" },
    notes: "US Territory.",
  },
]
