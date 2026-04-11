export function formatDateRange(start?: string, end?: string): string {
  if (!start) {
    return "Date TBD"
  }

  const startDate = new Date(`${start}T00:00:00`)
  const baseOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  }

  if (!end) {
    return startDate.toLocaleDateString("en-US", baseOptions)
  }

  const endDate = new Date(`${end}T00:00:00`)

  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}-${endDate.getDate()}, ${endDate.getFullYear()}`
  }

  return `${startDate.toLocaleDateString("en-US", baseOptions)} - ${endDate.toLocaleDateString("en-US", baseOptions)}`
}

export function formatConferenceStatus(status: string): string {
  const labelMap: Record<string, string> = {
    upcoming: "Upcoming",
    "registration-open": "Registration open",
    "in-progress": "Happening now",
    completed: "Archive",
    cancelled: "Cancelled",
    "sold-out": "Sold out",
  }

  return labelMap[status] ?? "Status unknown"
}
