"use client"

import { useActionState } from "react"
import { AlertTriangle, CheckCircle2, Loader2, Save } from "lucide-react"
import type { HubRegion } from "@/lib/hub/types"
import type { State } from "./actions"

const INITIAL: State = { success: false, message: "" }
type Action = (prev: State, formData: FormData) => Promise<State>

interface Defaults {
  name: string
  committee: string
  role: string
  regionId?: string
  email: string
  phone?: string
  yearsServed?: string
  willingToHelpWith?: string
  termEndsAt?: string
  consentRemainAfterTerm: boolean
  consentHelperList: boolean
  consentPastList: boolean
}

export function ProfileForm({
  action,
  regions,
  defaults,
  status,
}: {
  action: Action
  regions: HubRegion[]
  defaults: Defaults
  status?: "pending" | "approved" | "purged"
}) {
  const [state, formAction, pending] = useActionState(action, INITIAL)

  return (
    <form action={formAction} className="space-y-6">
      {status ? (
        <p className="card card-quiet text-xs uppercase tracking-wider mono">
          Directory status: <span className="text-[var(--color-accent-bright)]">{status}</span>
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <F label="Name *"><input name="name" required className="input" defaultValue={defaults.name} /></F>
        <F label="Email *"><input name="email" type="email" required className="input" defaultValue={defaults.email} /></F>
        <F label="Committee *"><input name="committee" required className="input" defaultValue={defaults.committee} /></F>
        <F label="Role *"><input name="role" required className="input" defaultValue={defaults.role} /></F>
        <F label="Region">
          <select name="regionId" className="input" defaultValue={defaults.regionId ?? ""}>
            <option value="">—</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </F>
        <F label="Phone"><input name="phone" className="input" defaultValue={defaults.phone} /></F>
        <F label="Years served"><input name="yearsServed" className="input" defaultValue={defaults.yearsServed} placeholder="e.g. 2024–2025" /></F>
        <F label="Term ends on">
          <input type="date" name="termEndsAt" className="input" defaultValue={defaults.termEndsAt} />
        </F>
      </div>

      <F label="Willing to help with">
        <textarea name="willingToHelpWith" className="input textarea" defaultValue={defaults.willingToHelpWith} placeholder="e.g. outreach questions, website, first-time chair mentoring" />
      </F>

      <fieldset className="space-y-3 rounded-lg border border-[var(--color-border-2)] p-5">
        <legend className="px-2 text-xs uppercase tracking-wider text-[var(--color-fg-3)]">Consent</legend>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consentRemainAfterTerm" defaultChecked={defaults.consentRemainAfterTerm} className="mt-1" />
          <span className="body-sm">
            I consent to remaining in the directory after my term ends, according to the lists I opt into below. If I don&rsquo;t check this box, my record is purged the day after my term ends.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consentHelperList" defaultChecked={defaults.consentHelperList} className="mt-1" />
          <span className="body-sm">
            Add me to the Experience, Strength, and Hope helper list. People in the portal can reach me for advice, newcomer calls, or mentorship.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consentPastList" defaultChecked={defaults.consentPastList} className="mt-1" />
          <span className="body-sm">
            Keep me on the past-chairs list after my term ends. Only visible inside the portal.
          </span>
        </label>
      </fieldset>

      {state.message ? (
        <p
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: state.success ? "var(--color-success)" : "var(--color-danger)" }}
        >
          {state.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end">
        <button type="submit" disabled={pending} className="btn btn-amber" aria-busy={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  )
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="caption">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  )
}