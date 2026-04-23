import { Fleuron } from "./fleuron"

/**
 * OrnamentalRule — a section divider with a fleuron centered on a gilt rule.
 *
 * Three variants:
 *   - `hair`        A single 1px hairline. Section break inside a card.
 *   - `double`      Two lines separated by a 2px gap. Major section edge.
 *   - `ornamented`  A rule with a centered fleuron cartouche. Page-level
 *                   transition, used once or twice per page at most.
 *
 * Use `ornamented` to mark the shift from hero → primary content, and
 * `double` for the joint between primary content and the atlas.
 */
type OrnamentalRuleProps = {
  variant?: "hair" | "double" | "ornamented"
  className?: string
  fleuronSize?: number
}

export function OrnamentalRule({
  variant = "ornamented",
  className,
  fleuronSize = 18,
}: OrnamentalRuleProps) {
  if (variant === "hair") {
    return (
      <hr
        aria-hidden
        className={className}
        style={{
          border: 0,
          height: 1,
          background: "var(--rule-color)",
          margin: "var(--space-8) 0",
        }}
      />
    )
  }

  if (variant === "double") {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          margin: "var(--space-8) 0",
          position: "relative",
          height: 5,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 1,
            background: "var(--rule-color)",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            background: "var(--rule-hair-color)",
          }}
        />
      </div>
    )
  }

  // ornamented: rule with a centered fleuron cartouche over a gap in the rule
  return (
    <div
      aria-hidden
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "var(--space-5)",
        margin: "var(--space-10) 0",
      }}
    >
      <span
        style={{
          height: 1,
          background:
            "linear-gradient(to right, transparent 0%, var(--rule-color) 40%, var(--rule-strong-color) 100%)",
        }}
      />
      <span style={{ display: "inline-flex", padding: "0 2px" }}>
        <Fleuron size={fleuronSize} />
      </span>
      <span
        style={{
          height: 1,
          background:
            "linear-gradient(to right, var(--rule-strong-color) 0%, var(--rule-color) 60%, transparent 100%)",
        }}
      />
    </div>
  )
}
