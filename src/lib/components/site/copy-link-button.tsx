"use client"

import { useState } from "react"

export function CopyLinkButton({
  href,
  className,
}: {
  href: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(href)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1600)
        } catch {
          window.open(href, "_blank", "noopener,noreferrer")
        }
      }}
    >
      {copied ? "Link copied" : "Copy share link"}
    </button>
  )
}
