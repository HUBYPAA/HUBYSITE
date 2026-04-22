"use client"

import { useActionState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import type { State } from "./actions"

const INITIAL: State = { success: false, message: "" }
type Action = (prev: State, formData: FormData) => Promise<State>

export function SubmitterAccessForm({
  action,
  defaults,
}: {
  action: Action
  defaults: { name: string; email: string }
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL)

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="caption">Name *</span>
          <input name="name" required className="input mt-2" defaultValue={defaults.name} />
          {state.errors?.name ? <Err msg={state.errors.name} /> : null}
        </label>
        <label className="block">
          <span className="caption">Email *</span>
          <input name="email" type="email" required className="input mt-2" defaultValue={defaults.email} />
          {state.errors?.email ? <Err msg={state.errors.email} /> : null}
        </label>
        <label className="block">
          <span className="caption">Committee *</span>
          <input name="committee" required className="input mt-2" placeholder="e.g. NECYPAA 2026" />
          {state.errors?.committee ? <Err msg={state.errors.committee} /> : null}
        </label>
        <label className="block">
          <span className="caption">Position *</span>
          <input name="position" required className="input mt-2" placeholder="e.g. Outreach Chair" />
          {state.errors?.position ? <Err msg={state.errors.position} /> : null}
        </label>
      </div>
      <label className="block">
        <span className="caption">Anything else</span>
        <textarea name="note" className="input textarea" placeholder="Optional" />
      </label>

      {state.message && !state.success ? (
        <p className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-danger)" }}>
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end">
        <button type="submit" disabled={pending} className="btn btn-amber" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pending ? "Sending…" : "Request access"}
        </button>
      </div>
    </form>
  )
}

function Err({ msg }: { msg: string }) {
  return <p className="mt-1 text-xs" style={{ color: "var(--color-danger)" }}>{msg}</p>
}