"use client"

import { useActionState, useState } from "react"
import { CalendarDays, MessageSquare, Pencil, Send } from "lucide-react"
import { submitInfo, type SubmitState } from "./actions"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"

type SubmitType = "meeting" | "conference" | "correction" | "feedback"

const TYPES: Array<{
  value: SubmitType
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "meeting", label: "new meeting", description: "Add a meeting that is missing.", icon: () => <HeraldicGlyph name="shield-cross" className="h-4 w-4" /> },
  { value: "conference", label: "conference update", description: "Add or update a conference.", icon: CalendarDays },
  { value: "correction", label: "correction", description: "Fix a bad time, link, city, or source.", icon: Pencil },
  { value: "feedback", label: "general note", description: "Share context that doesn't fit a listing.", icon: MessageSquare },
]

const INITIAL_STATE: SubmitState = { success: false, message: "" }

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmitType>("meeting")
  const [state, formAction, pending] = useActionState(submitInfo, INITIAL_STATE)

  if (state.success) {
    return (
      <div className="panel-vault relative p-7 text-center sm:p-9">
        {/* Single rising gilt star — earned ceremony */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center">
          <HeraldicGlyph name="star-eight" className="h-12 w-12 text-[var(--color-gilt)]" />
        </div>
        <h2
          className="mt-6 text-[var(--color-gilt)]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(1.8rem,3vw,2.4rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Submission received.
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-[rgba(241,233,214,0.78)]"
          style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.78 }}
        >
          {state.message}
        </p>
        <a href="/submit" className="action-altar mt-7">
          send another
        </a>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="type" value={submissionType} />

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {TYPES.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSubmissionType(option.value)}
              className="option-card text-left"
              data-active={submissionType === option.value}
              aria-pressed={submissionType === option.value}
            >
              <div className="option-card-icon">
                <Icon className="h-4 w-4" />
              </div>
              <p
                className="mt-3 text-[var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 600,
                  fontVariantCaps: "all-small-caps",
                  letterSpacing: "0.12em",
                  fontSize: "0.92rem",
                  textTransform: "lowercase",
                }}
              >
                {option.label}
              </p>
              <p
                className="mt-2 hidden text-[var(--color-muted)] sm:block"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.84rem", lineHeight: 1.6 }}
              >
                {option.description}
              </p>
            </button>
          )
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={submissionType === "correction" || submissionType === "feedback" ? "subject *" : "name *"}>
          <input
            name="name"
            required
            className="field"
            placeholder={
              submissionType === "meeting"
                ? "Meeting name"
                : submissionType === "conference"
                  ? "Conference name"
                  : "Short description"
            }
          />
        </FormField>

        <FormField label="city / state">
          <input
            name="location"
            className="field"
            placeholder="Optional but helpful"
          />
        </FormField>
      </div>

      <FormField label="source link">
        <input
          name="sourceLink"
          type="url"
          className="field"
          placeholder="Paste a listing, event site, or social link"
        />
      </FormField>

      <FormField label="details *">
        <textarea
          name="details"
          required
          className="textarea-field"
          placeholder="What should be added, changed, or verified? Include day, time, address, venue, dates, broken links, or anything else that would help someone trust the result."
        />
      </FormField>

      <FormField label="email for follow-up">
        <input name="email" type="email" className="field" placeholder="Optional" />
      </FormField>

      {state.message && !state.success ? (
        <p
          className="inline-flex items-center gap-2 text-[var(--color-danger)]"
          aria-live="polite"
          style={{
            fontFamily: "var(--font-serif)",
            fontVariantCaps: "all-small-caps",
            letterSpacing: "0.16em",
            fontSize: "0.86rem",
          }}
        >
          <HeraldicGlyph name="winged-shield" className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-[var(--color-muted)]"
          style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.92rem", lineHeight: 1.7 }}
        >
          No login. Optional email. Listing quality matters more than perfect prose.
        </p>
        <button type="submit" disabled={pending} className="action-primary w-full sm:w-auto">
          <Send className="h-4 w-4 text-[var(--color-gilt-soft)]" />
          {pending ? "sending…" : "send submission"}
        </button>
      </div>
    </form>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="meta-label">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  )
}
