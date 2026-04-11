import { withVercelToolbar } from "@vercel/toolbar/plugins/next"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  poweredByHeader: false,
}

export default withVercelToolbar()(nextConfig)
