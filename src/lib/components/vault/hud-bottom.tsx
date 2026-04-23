/**
 * THE VAULT · bottom HUD legend
 * Star color key + catalog counts. Non-interactive.
 */
export function HudBottom() {
  return (
    <div className="hud-bottom" aria-hidden>
      <div className="legend">
        <span>
          <span
            className="dot"
            style={{
              background: "var(--gold)",
              boxShadow: "0 0 6px rgba(214,162,78,0.6)",
            }}
          />
          CONFERENCE
        </span>
        <span>
          <span className="dot" style={{ background: "var(--vault-blue-bright)" }} />
          MEETING
        </span>
        <span>
          <span
            className="dot"
            style={{
              background: "var(--coral)",
              boxShadow: "0 0 6px rgba(223,78,50,0.6)",
            }}
          />
          STARTING SOON
        </span>
        <span>
          <span className="dot" style={{ background: "var(--star-dim)", opacity: 0.55 }} />
          DIM / STALE
        </span>
      </div>
      <div className="hud-bottom__right">
        247 MEETINGS · 14 CONFERENCES · 56 LOCATIONS · PLOTTED LIVE
      </div>
    </div>
  )
}