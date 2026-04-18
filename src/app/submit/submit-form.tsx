"use client"

import { useActionState, useState } from "react"
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Pencil,
  Send,
  Users,
} from "lucide-react"
import { submitInfo, type SubmitState } from "./actions"

type SubmitType = "meeting" | "conference" | "correction" | "feedback"

const TYPES: Array<{
  value: SubmitType
  label: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "meeting",    label: "New meeting",        description: "Add a meeting that is missing.",             Icon: Users },
  { value: "conference", label: "Conference update",  description: "Add or update a conference.",                Icon: CalendarDays },
  { value: "correction", label: "Correction",         description: "Fix a bad time, link, city, or source.",     Icon: Pencil },
  { value: "feedback",   label: "General note",       description: "Share context that doesn’t fit a listing.",  Icon: MessageSquare },
]

const INITIAL_STATE: SubmitState = { success: false, message: "" }

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmitType>("meeting")
  const [state, formAction, pending] = useActionState(submitInfo, INITIAL_STATE)

  if (state.success) {
    return (
      <div className="altar text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <CheckCircle2 className="h-7 w-7" style={{ color: "var(--color-gold-lit)" }} />
        </div>
        <h2 className="altar__title mt-6">Submission received.</h2>
        <p className="altar__summary mx-auto">{state.message}</p>
        <a href="/submit" className="altar__cta">Send another</a>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="type" value={submissionType} />

      <div>
        <p className="eyebrow">Type of submission</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {TYPES.map((option) => {
            const active = submissionType === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSubmissionType(option.value)}
                className="text-left rounded-md p-3 transition-all"
                style={{
                  border: "1px solid " + (active ? "rgba(79, 125, 255, 0.5)" : "var(--color-border-2)"),
                  background: active ? "rgba(79, 125, 255, 0.08)" : "var(--color-surface)",
                  boxShadow: active ? "0 0 0 1px rgba(79, 125, 255, 0.5), 0 0 24px rgba(79, 125, 255, 0.15)" : undefined,
                }}
                aria-pressed={active}
              >
                <span
                  className="inline-flex items-center justify-center h-8 w-8 rounded-md"
                  style={{
                    background: active ? "var(--color-accent)" : "var(--color-bg-raised)",
                    color: active ? "#ffffff" : "var(--color-fg-2)",
                  }}
                >
                  <option.Icon className="h-4 w-4" />
                </span>
                <p className="mt-2 text-sm font-medium" style={{ color: "var(--color-fg)" }}>{option.label}</p>
                <p className="body-sm mt-1 hidden sm:block">{option.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={submissionType === "correction" || submissionType === "feedback" ? "Subject *" : "Name *"}>
          <input
            name="name"
            required
            className="input"
            placeholder={
              submissionType === "meeting"    ? "Meeting name" :
              submissionType === "conference" ? "Conference name" :
              "Short description"
            }
          />
        </Field>

        <Field label="City / state">
          <input name="location" className="input" placeholder="Optional but helpful" />
        </Field>
      </div>

      <Field label="Source link">
        <input name="sourceLink" type="url" className="input" placeholder="Paste a listing, event site, or social link" />
      </Field>

      <Field label="Details *">
        <textarea
          name="details"
          required
          className="input textarea"
          placeholder="What should be added, changed, or verified? Include day, time, address, venue, dates, broken links, or anything else that would help someone trust the result."
        />
      </Field>

      <Field label="Email for follow-up">
        <input name="email" type="email" className="input" placeholder="Optional" />
      </Field>

      {state.message && !state.success ? (
        <p
          className="inline-flex items-center gap-2 text-sm"
          aria-live="polite"
          style={{ color: "var(--color-danger)" }}
        >
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="body-sm max-w-sm">
          No login. Optional email. Listing quality matters more than perfect prose.
        </p>
        <button type="submit" disabled={pending} className="btn btn-vault btn-lg" aria-busy={pending}>
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
          {pending ? "Sending…" : "Send submission"}
        </button>
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="caption">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  )
}
