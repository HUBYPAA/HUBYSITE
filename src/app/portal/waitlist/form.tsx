"use client"

import { useActionState } from "react"
import { AlertTriangle, Loader2, Send } from "lucide-react"
import type { WaitlistState } from "./actions"

const INITIAL: WaitlistState = { success: false, message: "" }

type Action = (prev: WaitlistState, formData: FormData) => Promise<WaitlistState>

export function WaitlistForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState(action, INITIAL)

  return (
    <form action={formAction} className="space-y-5">
      <label className="block">
        <span className="caption">Committee / conference *</span>
        <input name="committee" required className="input mt-2" placeholder="e.g. 2026 ACYPAA Host Committee" />
        {state.errors?.committee ? <Err msg={state.errors.committee} /> : null}
      </label>
      <label className="block">
        <span className="caption">Current position *</span>
        <input name="position" required className="input mt-2" placeholder="e.g. Chair, Vice Chair, Secretary" />
        {state.errors?.position ? <Err msg={state.errors.position} /> : null}
      </label>
      <label className="block">
        <span className="caption">Anything else we should know</span>
        <textarea name="reason" className="input textarea" placeholder="Optional" />
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