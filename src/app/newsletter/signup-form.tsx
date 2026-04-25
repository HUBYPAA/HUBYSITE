"use client"

import { useActionState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import { ActionStrip, FocalPanel } from "@/lib/components/atlas"
import { subscribeToNewsletter, type SubscribeState } from "./actions"
import type { HubRegion } from "@/lib/hub/types"

const INITIAL: SubscribeState = { success: false, message: "" }

export function NewsletterSignupForm({ regions }: { regions: HubRegion[] }) {
  const [state, action, pending] = useActionState(subscribeToNewsletter, INITIAL)

  if (state.success) {
    return (
      <FocalPanel
        kicker="Subscription confirmed"
        title="You are on the list."
        lead={state.message}
      />
    )
  }

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email *" error={state.errors?.email}>
          <input name="email" type="email" required placeholder="you@example.com" />
        </Field>
        <Field label="Name">
          <input name="name" placeholder="Optional" />
        </Field>
      </div>

      <fieldset className="grid gap-3">
        <legend className="caption">Regions</legend>
        <p className="body-sm" style={{ margin: 0 }}>
          Pick any. Leaving all unchecked signs you up for cross-regional
          issues only.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {regions.map((region) => (
            <label
              key={region.id}
              className="surface surface--quiet flex items-start gap-3 p-4"
            >
              <input type="checkbox" name="regionIds" value={region.id} className="mt-1" />
              <span className="body-sm" style={{ margin: 0 }}>
                {region.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="consent" className="mt-1" />
        <span className="body-sm" style={{ margin: 0 }}>
          I understand my email will only be used for the HUBYPAA newsletter in
          the regions I selected, and that I can unsubscribe at any time.
        </span>
      </label>
      {state.errors?.consent ? <FieldError msg={state.errors.consent} /> : null}

      {state.message && !state.success ? (
        <p
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: "var(--danger)", margin: 0 }}
        >
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <ActionStrip className="justify-end">
        <button type="submit" disabled={pending} className="btn btn--primary btn-lg" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pending ? "Sending..." : "Subscribe"}
        </button>
      </ActionStrip>
    </form>
  )
}

function Field({
  label,
  children,
  error,
}: {
  label: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="caption" style={{ marginBottom: 0 }}>
        {label}
      </span>
      {children}
      {error ? <FieldError msg={error} /> : null}
    </label>
  )
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="text-sm" style={{ color: "var(--danger)", margin: 0 }}>
      {msg}
    </p>
  )
}
