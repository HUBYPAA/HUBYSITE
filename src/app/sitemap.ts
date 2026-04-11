import { getConferences } from "@/lib/data/query/conferences"
import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl()
  const staticRoutes = [
    "",
    "/meetings",
    "/conferences",
    "/about",
    "/what-is-ypaa",
    "/safety",
    "/submit",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((pathname) => ({
    url: new URL(pathname || "/", siteUrl).toString(),
    changeFrequency: pathname === "" ? "daily" : "weekly",
    priority: pathname === "" ? 1 : 0.7,
  }))

  const conferenceEntries: MetadataRoute.Sitemap = getConferences().map(
    (conference) => ({
      url: new URL(`/conferences/${conference.slug}`, siteUrl).toString(),
      lastModified: conference.startDate ?? undefined,
      changeFrequency:
        conference.conferenceStatus === "completed" ? "yearly" : "weekly",
      priority: conference.featured ? 0.9 : 0.6,
    }),
  )

  return [...staticEntries, ...conferenceEntries]
}
