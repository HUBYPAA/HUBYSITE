"use client"

import { useActionState } from "react"
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react"
import { subscribeToNewsletter, type SubscribeState } from "./actions"
import type { HubRegion } from "@/lib/hub/types"

const INITIAL: SubscribeState = { success: false, message: "" }

export function NewsletterSignupForm({ regions }: { regions: HubRegion[] }) {
  const [state, action, pending] = useActionState(subscribeToNewsletter, INITIAL)

  if (state.success) {
    return (
      <div className="altar text-center">
        <div
          className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <CheckCircle2 className="h-7 w-7" style={{ color: "var(--color-gold-lit)" }} />
        </div>
        <h2 className="altar__title mt-6">You&rsquo;re on the list.</h2>
        <p className="altar__summary mx-auto">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="caption">Email *</span>
          <input name="email" type="email" required className="input mt-2" placeholder="you@example.com" />
          {state.errors?.email ? <FieldError msg={state.errors.email} /> : null}
        </label>
        <label className="block">
          <span className="caption">Name</span>
          <input name="name" className="input mt-2" placeholder="Optional" />
        </label>
      </div>

      <fieldset>
        <legend className="caption">Regions</legend>
        <p className="body-sm mt-1">
          Pick any. Leaving all unchecked signs you up for cross-regional issues only.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {regions.map((r) => (
            <label key={r.id} className="flex items-start gap-3 rounded-lg border border-[var(--color-border-2)] bg-[var(--color-surface)] px-3.5 py-3">
              <input type="checkbox" name="regionIds" value={r.id} className="mt-1" />
              <span className="text-sm text-[var(--color-fg)]">{r.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="consent" className="mt-1" />
        <span className="body-sm">
          I understand my email will be used solely for the HUBYPAA newsletter
          in my selected regions, and that I can unsubscribe at any time.
        </span>
      </label>
      {state.errors?.consent ? <FieldError msg={state.errors.consent} /> : null}

      {state.message && !state.success ? (
        <p className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-danger)" }}>
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end">
        <button type="submit" disabled={pending} className="btn btn-amber btn-lg" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
    </form>
  )
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1 text-xs" style={{ color: "var(--color-danger)" }}>
      {msg}
    </p>
  )
}