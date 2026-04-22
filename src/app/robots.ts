import { resolveSiteUrl } from "@/lib/utils/site-url"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteUrl()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/portal", "/auth", "/api"],
    },
    sitemap: `${siteUrl.origin}/sitemap.xml`,
    host: siteUrl.origin,
  }
}
