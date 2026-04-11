/**
 * Approximate coordinates for US states and major cities.
 * Used for map placement when source data lacks precise geocoding.
 *
 * State centroids from US Census Bureau (approximate).
 * City coordinates are approximate — suitable for map overview,
 * not turn-by-turn navigation.
 */

export interface LatLng {
  lat: number
  lng: number
}

// ── State Centroids ──────────────────────────────

export const STATE_CENTROIDS: Record<string, LatLng> = {
  AL: { lat: 32.806671, lng: -86.791130 },
  AK: { lat: 61.370716, lng: -152.404419 },
  AZ: { lat: 33.729759, lng: -111.431221 },
  AR: { lat: 34.969704, lng: -92.373123 },
  CA: { lat: 36.116203, lng: -119.681564 },
  CO: { lat: 39.059811, lng: -105.311104 },
  CT: { lat: 41.597782, lng: -72.755371 },
  DE: { lat: 39.318523, lng: -75.507141 },
  DC: { lat: 38.897438, lng: -77.026817 },
  FL: { lat: 27.766279, lng: -81.686783 },
  GA: { lat: 33.040619, lng: -83.643074 },
  HI: { lat: 21.094318, lng: -157.498337 },
  ID: { lat: 44.240459, lng: -114.478828 },
  IL: { lat: 40.349457, lng: -88.986137 },
  IN: { lat: 39.849426, lng: -86.258278 },
  IA: { lat: 42.011539, lng: -93.210526 },
  KS: { lat: 38.526600, lng: -96.726486 },
  KY: { lat: 37.668140, lng: -84.670067 },
  LA: { lat: 31.169546, lng: -91.867805 },
  ME: { lat: 44.693947, lng: -69.381927 },
  MD: { lat: 39.063946, lng: -76.802101 },
  MA: { lat: 42.230171, lng: -71.530106 },
  MI: { lat: 43.326618, lng: -84.536095 },
  MN: { lat: 45.694454, lng: -93.900192 },
  MS: { lat: 32.741646, lng: -89.678696 },
  MO: { lat: 38.456085, lng: -92.288368 },
  MT: { lat: 46.921925, lng: -110.454353 },
  NE: { lat: 41.125370, lng: -98.268082 },
  NV: { lat: 38.313515, lng: -117.055374 },
  NH: { lat: 43.452492, lng: -71.563896 },
  NJ: { lat: 40.298904, lng: -74.521011 },
  NM: { lat: 34.840515, lng: -106.248482 },
  NY: { lat: 42.165726, lng: -74.948051 },
  NC: { lat: 35.630066, lng: -79.806419 },
  ND: { lat: 47.528912, lng: -99.784012 },
  OH: { lat: 40.388783, lng: -82.764915 },
  OK: { lat: 35.565342, lng: -96.928917 },
  OR: { lat: 44.572021, lng: -122.070938 },
  PA: { lat: 40.590752, lng: -77.209755 },
  RI: { lat: 41.680893, lng: -71.511780 },
  SC: { lat: 33.856892, lng: -80.945007 },
  SD: { lat: 44.299782, lng: -99.438828 },
  TN: { lat: 35.747845, lng: -86.692345 },
  TX: { lat: 31.054487, lng: -97.563461 },
  UT: { lat: 40.150032, lng: -111.862434 },
  VT: { lat: 44.045876, lng: -72.710686 },
  VA: { lat: 37.769337, lng: -78.169968 },
  WA: { lat: 47.400902, lng: -121.490494 },
  WV: { lat: 38.491226, lng: -80.954453 },
  WI: { lat: 44.268543, lng: -89.616508 },
  WY: { lat: 42.755966, lng: -107.302490 },
  // Territories
  PR: { lat: 18.220833, lng: -66.590149 },
  VI: { lat: 18.335765, lng: -64.896335 },
  GU: { lat: 13.444304, lng: 144.793731 },
  AS: { lat: -14.270972, lng: -170.132217 },
  MP: { lat: 15.097900, lng: 145.673900 },
}

/**
 * Approximate city coordinates for cities appearing in meeting data.
 * Keyed as "City, ST" for lookup.
 */
export const CITY_COORDINATES: Record<string, LatLng> = {
  // Connecticut
  "Canaan, CT": { lat: 42.028, lng: -73.329 },
  "Canton, CT": { lat: 41.841, lng: -72.897 },
  "Colchester, CT": { lat: 41.576, lng: -72.332 },
  "Coventry, CT": { lat: 41.770, lng: -72.352 },
  "Danbury, CT": { lat: 41.394, lng: -73.454 },
  "Deep River, CT": { lat: 41.382, lng: -72.432 },
  "East Hartford, CT": { lat: 41.782, lng: -72.612 },
  "Farmington, CT": { lat: 41.720, lng: -72.832 },
  "Glastonbury, CT": { lat: 41.712, lng: -72.608 },
  "Greenwich, CT": { lat: 41.026, lng: -73.629 },
  "Guilford, CT": { lat: 41.289, lng: -72.682 },
  "Hartford, CT": { lat: 41.764, lng: -72.685 },
  "Manchester, CT": { lat: 41.776, lng: -72.521 },
  "Meriden, CT": { lat: 41.538, lng: -72.807 },
  "Middletown, CT": { lat: 41.562, lng: -72.650 },
  "Milford, CT": { lat: 41.222, lng: -73.057 },
  "New Haven, CT": { lat: 41.308, lng: -72.928 },
  "Norwalk, CT": { lat: 41.118, lng: -73.408 },
  "Shelton, CT": { lat: 41.242, lng: -73.093 },
  "South Glastonbury, CT": { lat: 41.684, lng: -72.583 },
  "Stamford, CT": { lat: 41.053, lng: -73.539 },
  "Storrs, CT": { lat: 41.808, lng: -72.250 },
  "Torrington, CT": { lat: 41.800, lng: -73.121 },
  "Trumbull, CT": { lat: 41.243, lng: -73.201 },
  "Waterbury, CT": { lat: 41.558, lng: -73.037 },
  "West Hartford, CT": { lat: 41.762, lng: -72.742 },
  "Westport, CT": { lat: 41.142, lng: -73.358 },
  "Willimantic, CT": { lat: 41.711, lng: -72.208 },
  "Winsted, CT": { lat: 41.921, lng: -73.060 },
  "Wolcott, CT": { lat: 41.602, lng: -72.987 },
  "Woodbury, CT": { lat: 41.545, lng: -73.209 },

  // Massachusetts
  "Boston, MA": { lat: 42.361, lng: -71.057 },
  "Braintree, MA": { lat: 42.204, lng: -70.875 },
  "Brockton, MA": { lat: 42.083, lng: -71.018 },
  "Brookline, MA": { lat: 42.332, lng: -71.121 },
  "Cambridge, MA": { lat: 42.373, lng: -71.110 },
  "Chelmsford, MA": { lat: 42.600, lng: -71.367 },
  "East Falmouth, MA": { lat: 41.571, lng: -70.556 },
  "Fairhaven, MA": { lat: 41.638, lng: -70.874 },
  "Fall River, MA": { lat: 41.701, lng: -71.155 },
  "Martha's Vineyard, MA": { lat: 41.390, lng: -70.645 },
  "Mashpee, MA": { lat: 41.648, lng: -70.479 },
  "Melrose, MA": { lat: 42.459, lng: -71.060 },
  "Mendon, MA": { lat: 42.106, lng: -71.552 },
  "New Bedford, MA": { lat: 41.636, lng: -70.934 },
  "Newburyport, MA": { lat: 42.812, lng: -70.877 },
  "Newton, MA": { lat: 42.337, lng: -71.209 },
  "Plymouth, MA": { lat: 41.958, lng: -70.667 },
  "Quincy, MA": { lat: 42.253, lng: -71.002 },
  "Rockland, MA": { lat: 42.131, lng: -70.908 },
  "Scituate, MA": { lat: 42.195, lng: -70.726 },
  "Somerville, MA": { lat: 42.388, lng: -71.100 },
  "South Boston, MA": { lat: 42.338, lng: -71.050 },
  "Springfield, MA": { lat: 42.101, lng: -72.590 },
  "Waltham, MA": { lat: 42.376, lng: -71.236 },
  "Whitman, MA": { lat: 42.081, lng: -70.935 },
  "Worcester, MA": { lat: 42.262, lng: -71.802 },

  // New York
  "Albany, NY": { lat: 42.653, lng: -73.757 },
  "Baldwin, NY": { lat: 40.656, lng: -73.609 },
  "Bronx, NY": { lat: 40.845, lng: -73.865 },
  "Brooklyn, NY": { lat: 40.650, lng: -73.950 },
  "Buffalo, NY": { lat: 42.886, lng: -78.878 },
  "Glens Falls, NY": { lat: 43.310, lng: -73.644 },
  "Hudson, NY": { lat: 42.253, lng: -73.791 },
  "Kingston, NY": { lat: 41.927, lng: -73.997 },
  "Manhattan, NY": { lat: 40.776, lng: -73.972 },
  "New York, NY": { lat: 40.713, lng: -74.006 },
  "Plattsburgh, NY": { lat: 44.699, lng: -73.453 },
  "Pleasant Valley, NY": { lat: 41.745, lng: -73.821 },
  "Poughkeepsie, NY": { lat: 41.694, lng: -73.921 },
  "Queens, NY": { lat: 40.728, lng: -73.794 },
  "Rochester, NY": { lat: 43.157, lng: -77.616 },
  "Saratoga Springs, NY": { lat: 43.083, lng: -73.785 },
  "Scarsdale, NY": { lat: 40.989, lng: -73.784 },
  "Staten Island, NY": { lat: 40.579, lng: -74.151 },
  "Stone Ridge, NY": { lat: 41.851, lng: -74.138 },
  "Syracuse, NY": { lat: 43.049, lng: -76.147 },
  "Troy, NY": { lat: 42.728, lng: -73.692 },

  // Pennsylvania
  "Allentown, PA": { lat: 40.602, lng: -75.471 },
  "Bethlehem, PA": { lat: 40.625, lng: -75.371 },
  "Boyertown, PA": { lat: 40.334, lng: -75.637 },
  "Castle Shannon, PA": { lat: 40.365, lng: -80.023 },
  "Collingdale, PA": { lat: 39.915, lng: -75.278 },
  "Downingtown, PA": { lat: 40.006, lng: -75.703 },
  "Drexel Hill, PA": { lat: 39.947, lng: -75.304 },
  "Erie, PA": { lat: 42.129, lng: -80.085 },
  "Lancaster, PA": { lat: 40.038, lng: -76.306 },
  "Media, PA": { lat: 39.917, lng: -75.388 },
  "Philadelphia, PA": { lat: 39.953, lng: -75.164 },
  "Pittsburgh, PA": { lat: 40.441, lng: -79.996 },
  "Springfield, PA": { lat: 39.931, lng: -75.320 },
  "Toughkenamon, PA": { lat: 39.831, lng: -75.759 },
  "Villanova, PA": { lat: 40.038, lng: -75.347 },
  "Wyomissing, PA": { lat: 40.329, lng: -75.965 },

  // New Jersey
  "Asbury Park, NJ": { lat: 40.220, lng: -74.012 },
  "Bloomfield, NJ": { lat: 40.807, lng: -74.186 },
  "Clementon, NJ": { lat: 39.811, lng: -74.983 },
  "Denville, NJ": { lat: 40.893, lng: -74.478 },
  "Franklin, NJ": { lat: 41.122, lng: -74.586 },
  "Hackensack, NJ": { lat: 40.886, lng: -74.043 },
  "Haddonfield, NJ": { lat: 39.892, lng: -75.037 },
  "Hampton, NJ": { lat: 40.704, lng: -74.958 },
  "Hoboken, NJ": { lat: 40.744, lng: -74.028 },
  "Jersey City, NJ": { lat: 40.728, lng: -74.078 },
  "Millington, NJ": { lat: 40.673, lng: -74.525 },
  "Newark, NJ": { lat: 40.736, lng: -74.172 },
  "Paramus, NJ": { lat: 40.945, lng: -74.076 },
  "Pluckemin, NJ": { lat: 40.637, lng: -74.610 },
  "Toms River, NJ": { lat: 39.954, lng: -74.198 },

  // Florida
  "Fort Lauderdale, FL": { lat: 26.122, lng: -80.137 },
  "Jacksonville, FL": { lat: 30.332, lng: -81.656 },
  "Miami, FL": { lat: 25.762, lng: -80.192 },
  "Miami Beach, FL": { lat: 25.791, lng: -80.130 },
  "Orlando, FL": { lat: 28.538, lng: -81.379 },
  "St. Petersburg, FL": { lat: 27.771, lng: -82.679 },
  "Tampa, FL": { lat: 27.951, lng: -82.458 },
  "West Palm Beach, FL": { lat: 26.715, lng: -80.054 },

  // Texas
  "Austin, TX": { lat: 30.267, lng: -97.743 },
  "Dallas, TX": { lat: 32.777, lng: -96.797 },
  "El Paso, TX": { lat: 31.761, lng: -106.485 },
  "Fort Worth, TX": { lat: 32.755, lng: -97.331 },
  "Houston, TX": { lat: 29.760, lng: -95.370 },
  "San Antonio, TX": { lat: 29.425, lng: -98.495 },

  // California
  "Irvine, CA": { lat: 33.684, lng: -117.826 },
  "Los Angeles, CA": { lat: 34.052, lng: -118.244 },
  "Oakland, CA": { lat: 37.804, lng: -122.271 },
  "Sacramento, CA": { lat: 38.582, lng: -121.494 },
  "San Diego, CA": { lat: 32.716, lng: -117.161 },
  "San Francisco, CA": { lat: 37.775, lng: -122.419 },
  "San Jose, CA": { lat: 37.339, lng: -121.895 },
  "Santa Monica, CA": { lat: 34.019, lng: -118.491 },

  // Illinois
  "Chicago, IL": { lat: 41.878, lng: -87.630 },
  "Evanston, IL": { lat: 42.045, lng: -87.688 },
  "Naperville, IL": { lat: 41.786, lng: -88.147 },

  // Ohio
  "Akron, OH": { lat: 41.081, lng: -81.519 },
  "Cincinnati, OH": { lat: 39.103, lng: -84.512 },
  "Cleveland, OH": { lat: 41.500, lng: -81.694 },
  "Columbus, OH": { lat: 39.961, lng: -82.999 },
  "Dayton, OH": { lat: 39.759, lng: -84.192 },

  // Georgia
  "Atlanta, GA": { lat: 33.749, lng: -84.388 },
  "Savannah, GA": { lat: 32.081, lng: -81.091 },

  // Colorado
  "Boulder, CO": { lat: 40.015, lng: -105.271 },
  "Colorado Springs, CO": { lat: 38.834, lng: -104.821 },
  "Denver, CO": { lat: 39.739, lng: -104.990 },
  "Fort Collins, CO": { lat: 40.585, lng: -105.084 },

  // Washington
  "Bellingham, WA": { lat: 48.752, lng: -122.478 },
  "Seattle, WA": { lat: 47.606, lng: -122.332 },
  "Tacoma, WA": { lat: 47.253, lng: -122.444 },

  // Oregon
  "Bend, OR": { lat: 44.058, lng: -121.315 },
  "Eugene, OR": { lat: 44.052, lng: -123.087 },
  "Portland, OR": { lat: 45.523, lng: -122.676 },

  // Michigan
  "Ann Arbor, MI": { lat: 42.281, lng: -83.749 },
  "Detroit, MI": { lat: 42.331, lng: -83.046 },
  "Grand Rapids, MI": { lat: 42.963, lng: -85.668 },
  "Kalamazoo, MI": { lat: 42.292, lng: -85.587 },

  // Minnesota
  "Duluth, MN": { lat: 46.787, lng: -92.100 },
  "Minneapolis, MN": { lat: 44.978, lng: -93.265 },
  "St. Paul, MN": { lat: 44.954, lng: -93.090 },

  // Maryland
  "Baltimore, MD": { lat: 39.290, lng: -76.612 },
  "Bethesda, MD": { lat: 38.981, lng: -77.094 },
  "Bowie, MD": { lat: 38.943, lng: -76.730 },
  "Catonsville, MD": { lat: 39.272, lng: -76.732 },
  "Lutherville-Timonium, MD": { lat: 39.419, lng: -76.636 },
  "Silver Spring, MD": { lat: 38.991, lng: -77.026 },
  "Towson, MD": { lat: 39.402, lng: -76.602 },

  // Virginia
  "Arlington, VA": { lat: 38.880, lng: -77.107 },
  "Charlottesville, VA": { lat: 38.030, lng: -78.479 },
  "Norfolk, VA": { lat: 36.851, lng: -76.286 },
  "Richmond, VA": { lat: 37.541, lng: -77.434 },
  "Virginia Beach, VA": { lat: 36.853, lng: -75.978 },

  // North Carolina
  "Asheville, NC": { lat: 35.595, lng: -82.551 },
  "Charlotte, NC": { lat: 35.228, lng: -80.843 },
  "Durham, NC": { lat: 35.994, lng: -78.899 },
  "Raleigh, NC": { lat: 35.780, lng: -78.639 },

  // Tennessee
  "Knoxville, TN": { lat: 35.960, lng: -83.921 },
  "Memphis, TN": { lat: 35.150, lng: -90.049 },
  "Nashville, TN": { lat: 36.163, lng: -86.781 },

  // Arizona
  "Phoenix, AZ": { lat: 33.449, lng: -112.074 },
  "Tempe, AZ": { lat: 33.426, lng: -111.940 },
  "Tucson, AZ": { lat: 32.222, lng: -110.975 },

  // DC
  "Washington, DC": { lat: 38.907, lng: -77.037 },

  // New Hampshire
  "Concord, NH": { lat: 43.208, lng: -71.538 },
  "Hampton, NH": { lat: 42.938, lng: -70.839 },
  "Keene, NH": { lat: 42.934, lng: -72.278 },
  "Laconia, NH": { lat: 43.528, lng: -71.470 },
  "Manchester, NH": { lat: 42.996, lng: -71.455 },
  "Nashua, NH": { lat: 42.765, lng: -71.468 },
  "Newmarket, NH": { lat: 43.077, lng: -70.935 },
  "Portsmouth, NH": { lat: 43.072, lng: -70.763 },
  "Salem, NH": { lat: 42.788, lng: -71.209 },

  // Rhode Island
  "East Greenwich, RI": { lat: 41.660, lng: -71.456 },
  "Kingston, RI": { lat: 41.480, lng: -71.523 },
  "Newport, RI": { lat: 41.490, lng: -71.313 },
  "Providence, RI": { lat: 41.824, lng: -71.413 },
  "Warwick, RI": { lat: 41.700, lng: -71.416 },

  // Vermont
  "Burlington, VT": { lat: 44.476, lng: -73.212 },
  "Essex Junction, VT": { lat: 44.490, lng: -73.111 },

  // Maine
  "Auburn, ME": { lat: 44.098, lng: -70.231 },
  "Bath, ME": { lat: 43.911, lng: -69.821 },
  "Houlton, ME": { lat: 46.126, lng: -67.840 },
  "Norway, ME": { lat: 44.214, lng: -70.545 },
  "Portland, ME": { lat: 43.661, lng: -70.256 },

  // Delaware
  "Dover, DE": { lat: 39.158, lng: -75.524 },
  "Wilmington, DE": { lat: 39.746, lng: -75.547 },
}

/**
 * Resolve coordinates for a meeting given city + state.
 * Falls back to state centroid, then continental US center.
 */
export function resolveCoordinates(
  city?: string,
  state?: string,
): LatLng | null {
  if (city && state) {
    const cityKey = `${city}, ${state}`
    if (CITY_COORDINATES[cityKey]) return CITY_COORDINATES[cityKey]
  }
  if (state && STATE_CENTROIDS[state]) return STATE_CENTROIDS[state]
  return null
}
