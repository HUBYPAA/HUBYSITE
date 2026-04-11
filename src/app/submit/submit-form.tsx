"use client"

import { useActionState, useState } from "react"
import { Check, Send } from "lucide-react"
import { submitInfo, type SubmitState } from "./actions"

type SubmitType = "meeting" | "conference" | "correction" | "feedback"

const TYPES: Array<{
  value: SubmitType
  label: string
  description: string
}> = [
  {
    value: "meeting",
    label: "New meeting",
    description: "Add a meeting that is missing from the directory.",
  },
  {
    value: "conference",
    label: "Conference update",
    description: "Add or update a conference record.",
  },
  {
    value: "correction",
    label: "Correction",
    description: "Fix a bad time, stale link, wrong city, or broken source.",
  },
  {
    value: "feedback",
    label: "General note",
    description: "Share context, questions, or ideas that do not fit a listing.",
  },
]

const INITIAL_STATE: SubmitState = {
  success: false,
  message: "",
}

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmitType>("meeting")
  const [state, formAction, pending] = useActionState(submitInfo, INITIAL_STATE)

  if (state.success) {
    return (
      <div className="panel-raised p-6 text-center sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/10">
          <Check className="h-6 w-6 text-accent" />
        </div>
        <h2 className="mt-6 font-serif text-2xl tracking-[-0.04em] text-ink sm:text-3xl">
          Submission received.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted">
          {state.message}
        </p>
        <a href="/submit" className="action-secondary mt-6">
          Send another
        </a>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="type" value={submissionType} />

      {/* Type selector - horizontal scroll on mobile for compact display */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {TYPES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSubmissionType(option.value)}
            className="panel-muted p-4 text-left sm:p-5"
            style={{
              borderColor:
                submissionType === option.value
                  ? "rgba(183, 140, 86, 0.3)"
                  : "rgba(255,255,255,0.06)",
              background:
                submissionType === option.value
                  ? "rgba(183, 140, 86, 0.12)"
                  : undefined,
            }}
          >
            <p className="text-sm font-medium text-ink sm:text-base">{option.label}</p>
            <p className="mt-1.5 hidden text-sm leading-6 text-muted sm:block">{option.description}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="meta-label">
            {submissionType === "correction" || submissionType === "feedback"
              ? "Subject"
              : "Name"}
          </span>
          <input
            name="name"
            required
            className="field mt-2"
            placeholder={
              submissionType === "meeting"
                ? "Meeting name"
                : submissionType === "conference"
                  ? "Conference name"
                  : "Short description"
            }
          />
        </label>

        <label className="block">
          <span className="meta-label">City / state</span>
          <input
            name="location"
            className="field mt-2"
            placeholder="Optional but helpful"
          />
        </label>
      </div>

      <label className="block">
        <span className="meta-label">Source link</span>
        <input
          name="sourceLink"
          type="url"
          className="field mt-2"
          placeholder="Paste a listing, event site, or social link"
        />
      </label>

      <label className="block">
        <span className="meta-label">Details</span>
        <textarea
          name="details"
          required
          className="textarea-field mt-2"
          placeholder="What should be added, changed, or verified? Include day, time, address, venue, dates, broken links, or anything else that would help someone trust the result."
        />
      </label>

      <label className="block">
        <span className="meta-label">Email for follow-up</span>
        <input
          name="email"
          type="email"
          className="field mt-2"
          placeholder="Optional"
        />
      </label>

      {state.message && !state.success ? (
        <p className="text-sm font-medium text-danger" aria-live="polite">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="action-primary w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {pending ? "Sending..." : "Send submission"}
      </button>
    </form>
  )
}
