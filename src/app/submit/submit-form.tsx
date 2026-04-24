"use client"

import { useActionState, useState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import { submitInfo, type SubmitState } from "./actions"

type SubmitType = "meeting" | "conference" | "correction" | "feedback"

const TYPES: Array<{ value: SubmitType; label: string }> = [
  { value: "meeting",    label: "New meeting" },
  { value: "conference", label: "Conference update" },
  { value: "correction", label: "Correction" },
  { value: "feedback",   label: "General note" },
]

const INITIAL_STATE: SubmitState = { success: false, message: "" }

export function SubmitForm() {
  const [submissionType, setSubmissionType] = useState<SubmitType>("meeting")
  const [state, formAction, pending] = useActionState(submitInfo, INITIAL_STATE)

  if (state.success) {
    return (
      <section className="star-moment" style={{ minHeight: "auto", paddingBlock: "var(--space-16)" }}>
        <span className="starmark starmark--hero" aria-hidden />
        <h2 className="star-moment__title">
          Submission <em>received.</em>
        </h2>
        <p className="star-moment__lede">{state.message}</p>
        <div className="star-moment__actions">
          <a href="/submit" className="btn btn--gold">Send another</a>
          <a href="/" className="btn btn--ghost">Home</a>
        </div>
      </section>
    )
  }

  return (
    <form action={formAction} className="quiet-form">
      <input type="hidden" name="type" value={submissionType} />

      <div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontFeatureSettings: 'var(--ff-label)',
            fontSize: "10.5px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gilt-aged)",
            margin: "0 0 var(--space-3)",
          }}
        >
          Type of submission
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "var(--space-2)",
          }}
        >
          {TYPES.map((option) => {
            const active = submissionType === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSubmissionType(option.value)}
                aria-pressed={active}
                style={{
                  padding: "10px 14px",
                  fontFamily: "var(--font-mono)",
                  fontFeatureSettings: 'var(--ff-label)',
                  fontSize: "10.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active ? "var(--gilt-lit)" : "var(--parchment)",
                  background: active ? "rgba(216,168,69,0.10)" : "rgba(7,6,4,0.45)",
                  border: "1px solid " + (active ? "var(--gilt)" : "var(--rule-color)"),
                  borderRadius: "var(--radius-1)",
                  cursor: "pointer",
                  transition: "border-color 160ms ease, color 160ms ease, background 160ms ease",
                }}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <label>
        <span>{submissionType === "correction" || submissionType === "feedback" ? "Subject *" : "Name *"}</span>
        <input
          name="name"
          required
          placeholder={
            submissionType === "meeting"    ? "Meeting name" :
            submissionType === "conference" ? "Conference name" :
            "Short description"
          }
        />
      </label>

      <label>
        <span>City / state</span>
        <input name="location" placeholder="Optional but helpful" />
      </label>

      <label>
        <span>Source link</span>
        <input name="sourceLink" type="url" placeholder="Paste a listing, event site, or social link" />
      </label>

      <label>
        <span>Details *</span>
        <textarea
          name="details"
          required
          placeholder="What should be added, changed, or verified? Include day, time, address, venue, dates, broken links, or anything else."
        />
      </label>

      <label>
        <span>Email for follow-up</span>
        <input name="email" type="email" placeholder="Optional" />
      </label>

      {state.message && !state.success ? (
        <p
          aria-live="polite"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontSize: "var(--text-sm)",
            color: "var(--color-danger)",
            margin: 0,
          }}
        >
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="quiet-form__actions">
        <button type="submit" disabled={pending} className="btn btn--gold" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {pending ? "Sending…" : "Send submission"}
        </button>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--gilt-aged)",
            margin: 0,
            alignSelf: "center",
          }}
        >
          No login. Optional email.
        </p>
      </div>
    </form>
  )
}
