"use client"

import { useActionState } from "react"
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react"
import type { HubRegion } from "@/lib/hub/types"
import type { State } from "./actions"

const INITIAL: State = { success: false, message: "" }
type Action = (prev: State, formData: FormData) => Promise<State>

export interface EventFormDefaults {
  submitterName: string
  submitterEmail: string
  title?: string
  date?: string
  endDate?: string
  time?: string
  regionId?: string
  city?: string
  state?: string
  venue?: string
  hostCommittee?: string
  registrationUrl?: string
  chairPitch?: string
  id?: string
}

export function EventSubmitForm({
  action,
  regions,
  defaults,
  editing = false,
}: {
  action: Action
  regions: HubRegion[]
  defaults: EventFormDefaults
  editing?: boolean
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL)

  if (state.success && !editing) {
    // Submit action redirects; this branch is mostly for `updateOwnEvent`.
    return (
      <p className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-success)" }}>
        <CheckCircle2 className="h-4 w-4" />
        {state.message}
      </p>
    )
  }

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      {defaults.id ? <input type="hidden" name="id" value={defaults.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Event title *" error={state.errors?.title}>
          <input name="title" required className="input" defaultValue={defaults.title} />
        </F>
        <F label="Host committee / board *" error={state.errors?.hostCommittee}>
          <input name="hostCommittee" required className="input" defaultValue={defaults.hostCommittee} />
        </F>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <F label="Start date *" error={state.errors?.date}>
          <input type="date" name="date" required className="input" defaultValue={defaults.date} />
        </F>
        <F label="End date">
          <input type="date" name="endDate" className="input" defaultValue={defaults.endDate} />
        </F>
        <F label="Time">
          <input name="time" className="input" placeholder="e.g. 6pm – 10pm" defaultValue={defaults.time} />
        </F>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <F label="Region *" error={state.errors?.regionId}>
          <select name="regionId" required className="input" defaultValue={defaults.regionId ?? ""}>
            <option value="" disabled>Pick a region</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </F>
        <F label="City *" error={state.errors?.city}>
          <input name="city" required className="input" defaultValue={defaults.city} />
        </F>
        <F label="State / province">
          <input name="state" className="input" defaultValue={defaults.state} />
        </F>
      </div>

      <F label="Venue *" error={state.errors?.venue}>
        <input name="venue" required className="input" defaultValue={defaults.venue} />
      </F>

      <F label="Registration link">
        <input name="registrationUrl" type="url" className="input" placeholder="https://…" defaultValue={defaults.registrationUrl} />
      </F>

      <F label="Flyer (JPG, PNG, WEBP, GIF, AVIF — up to 8 MB)">
        <input name="flyer" type="file" className="input" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" />
      </F>

      <F label="Chair pitch (for newsletter — optional, not shown publicly)">
        <textarea name="chairPitch" className="input textarea" defaultValue={defaults.chairPitch} />
      </F>

      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Submitter name *">
          <input className="input" value={defaults.submitterName} readOnly />
        </F>
        <F label="Submitter email *">
          <input className="input" value={defaults.submitterEmail} readOnly />
        </F>
      </div>

      {state.message && !state.success ? (
        <p className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-danger)" }}>
          <AlertTriangle className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}
      {state.message && state.success ? (
        <p className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--color-success)" }}>
          <CheckCircle2 className="h-4 w-4" />
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end">
        <button type="submit" disabled={pending} className="btn btn-amber btn-lg" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {pending ? "Sending…" : editing ? "Save changes" : "Send for review"}
        </button>
      </div>
    </form>
  )
}

function F({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="caption">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1 block text-xs" style={{ color: "var(--color-danger)" }}>{error}</span> : null}
    </label>
  )
}