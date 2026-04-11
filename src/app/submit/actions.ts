"use server"

export interface SubmitState {
  success: boolean
  message: string
}

export async function submitInfo(
  _previousState: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const type = String(formData.get("type") ?? "").trim()
  const name = String(formData.get("name") ?? "").trim()
  const location = String(formData.get("location") ?? "").trim()
  const sourceLink = String(formData.get("sourceLink") ?? "").trim()
  const details = String(formData.get("details") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()

  if (!type) {
    return { success: false, message: "Choose a submission type first." }
  }

  if (!name) {
    return { success: false, message: "Add a name or short subject." }
  }

  if (!details) {
    return { success: false, message: "Add the details that should be reviewed." }
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "That email address does not look valid." }
  }

  console.log("[YPAA submission]", {
    type,
    name,
    location: location || null,
    sourceLink: sourceLink || null,
    details,
    email: email || null,
    timestamp: new Date().toISOString(),
  })

  return {
    success: true,
    message:
      "Thanks. The submission has been captured in the current scaffold flow. The next step is wiring this to a durable inbox or issue pipeline before production.",
  }
}
