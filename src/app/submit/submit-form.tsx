"use client"

import Link from "next/link"
import { useActionState, useState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import { ActionStrip, FocalPanel, StatusRail, Surface } from "@/lib/components/atlas"
import { submitInfo, type SubmitState } from "./actions"

type SubmitType = "meeting" | "conference" | "correction" | "feedback"

const TYPES: Array<{ value: SubmitType; label: string }> = [
  { value: "meeting", label: "New meeting" },
  { value: "conference", label: "Conference update" },
  { value: "correction", label: "Correction" },
  { value: "feedback", label: "General note" },
]

const INITIAL_STATE: SubmitState = { success: false, message: "" }

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmitType>("meeting")
  const [state, formAction, pending] = useActionState(submitInfo, INITIAL_STATE)

  if (state.success) {
    return (
      <FocalPanel
        kicker="Submission received"
        title="The note is in."
        lead={state.message}
        actions={
          <ActionStrip>
            <Link href="/submit" className="btn btn--primary">
              Send another
            </Link>
            <Link href="/" className="btn btn--ghost">
              Back home
            </Link>
          </ActionStrip>
        }
        aside={
          <Surface tone="quiet">
            <StatusRail
              steps={[
                { label: "Sent", detail: "Your note is in the intake queue.", state: "complete" },
                { label: "Reviewed", detail: "A human will confirm what changed.", state: "current" },
                { label: "Applied", detail: "The atlas gets stronger record by record.", state: "upcoming" },
              ]}
            />
          </Surface>
        }
      />
    )
  }

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="type" value={submissionType} />

      <Surface className="grid gap-4">
        <div>
          <p className="page-kicker">Submission type</p>
          <h2 className="heading-lg">01 · What is it?</h2>
        </div>
        <ActionStrip>
          {TYPES.map((option) => {
            const active = submissionType === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSubmissionType(option.value)}
                aria-pressed={active}
                className={active ? "btn btn--secondary btn-sm" : "btn btn--ghost btn-sm"}
              >
                {option.label}
              </button>
            )
          })}
        </ActionStrip>
      </Surface>

      <Surface className="grid gap-4">
        <div>
          <p className="page-kicker">Timing and place</p>
          <h2 className="heading-lg">02 · When is it? 03 · Where is it?</h2>
        </div>
        <div className="grid gap-4">
          <Field
            label={submissionType === "correction" || submissionType === "feedback" ? "Subject *" : "Name *"}
            help={
              submissionType === "meeting"
                ? "Use the meeting name if you have it."
                : submissionType === "conference"
                  ? "Use the conference or event name."
                  : "Keep the subject short and direct."
            }
          >
            <input
              name="name"
              required
              placeholder={
                submissionType === "meeting"
                  ? "Meeting name"
                  : submissionType === "conference"
                    ? "Conference name"
                    : "Short description"
              }
            />
          </Field>

          <Field
            label="City / state"
            help="Optional, but it helps the reviewer land in the right place faster."
          >
            <input name="location" placeholder="City, state, venue, or neighborhood" />
          </Field>
        </div>
      </Surface>

      <Surface className="grid gap-4">
        <div>
          <p className="page-kicker">Verification</p>
          <h2 className="heading-lg">04 · How can it be verified?</h2>
        </div>
        <Field
          label="Source link"
          help="Paste a listing, event site, flyer page, or social post that confirms the detail."
        >
          <input
            name="sourceLink"
            type="url"
            placeholder="https://"
          />
        </Field>

        <Field
          label="Details *"
          help="Include day, time, address, venue, dates, broken links, or anything else that should be changed."
        >
          <textarea
            name="details"
            required
            placeholder="What should be added, changed, or verified?"
          />
        </Field>
      </Surface>

      <Surface className="grid gap-4">
        <div>
          <p className="page-kicker">Follow up</p>
          <h2 className="heading-lg">05 · How can we reach you?</h2>
        </div>
        <Field
          label="Email for follow-up"
          help="Optional, but useful if the reviewer needs one confirming detail."
        >
          <input name="email" type="email" placeholder="you@example.com" />
        </Field>
      </Surface>

      {state.message && !state.success ? (
        <p
          aria-live="polite"
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "var(--danger)", margin: 0 }}
        >
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <ActionStrip className="justify-between">
        <p className="body-sm" style={{ margin: 0 }}>
          No login. Optional email. Human review.
        </p>
        <button type="submit" disabled={pending} className="btn btn--primary" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {pending ? "Sending..." : "Send submission"}
        </button>
      </ActionStrip>
    </form>
  )
}

function Field({
  label,
  help,
  children,
}: {
  label: string
  help?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2">
      <span className="caption" style={{ marginBottom: 0 }}>
        {label}
      </span>
      {children}
      {help ? (
        <span className="body-sm" style={{ margin: 0 }}>
          {help}
        </span>
      ) : null}
    </label>
  )
}
