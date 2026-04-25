import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ")
}

export function PageShell({
  tone = "stone",
  className,
  children,
}: {
  tone?: "stone" | "plaster" | "canopy" | "portal" | "admin" | "wood"
  className?: string
  children: ReactNode
}) {
  return <section className={cx("page-shell", `page-shell--${tone}`, className)}>{children}</section>
}

export function PageIntro({
  kicker,
  title,
  lead,
  actions,
  aside,
  align = "left",
  compact = false,
}: {
  kicker?: ReactNode
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  align?: "left" | "center"
  compact?: boolean
}) {
  return (
    <header
      className={cx(
        "page-intro",
        align === "center" && "page-intro--center",
        compact && "page-intro--compact",
      )}
    >
      <div className="page-intro__copy">
        {kicker ? <p className="page-intro__kicker">{kicker}</p> : null}
        <h1 className="page-intro__title">{title}</h1>
        {lead ? <div className="page-intro__lead">{lead}</div> : null}
        {actions ? <div className="page-intro__actions">{actions}</div> : null}
      </div>
      {aside ? <aside className="page-intro__aside">{aside}</aside> : null}
    </header>
  )
}

export function ThresholdBand({
  label,
  title,
  detail,
  children,
}: {
  label?: ReactNode
  title: ReactNode
  detail?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="threshold-band">
      <div className="threshold-band__head">
        <div>
          {label ? <p className="threshold-band__label">{label}</p> : null}
          <h2 className="threshold-band__title">{title}</h2>
        </div>
        {detail ? <div className="threshold-band__detail">{detail}</div> : null}
      </div>
      {children ? <div className="threshold-band__body">{children}</div> : null}
    </section>
  )
}

export function ActionStrip({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cx("action-strip", className)}>{children}</div>
}

export function Surface({
  tone = "default",
  className,
  children,
}: {
  tone?: "default" | "quiet" | "inset" | "wood" | "canopy"
  className?: string
  children: ReactNode
}) {
  return <div className={cx("surface", `surface--${tone}`, className)}>{children}</div>
}

export function LedgerRows({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cx("ledger-rows", className)}>{children}</div>
}

export function LedgerRow({
  href,
  label,
  title,
  summary,
  meta,
  actions,
  active = false,
  tone = "default",
}: {
  href?: string
  label?: ReactNode
  title: ReactNode
  summary?: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  active?: boolean
  tone?: "default" | "warm" | "quiet" | "selected"
}) {
  const content = (
    <>
      <div className="ledger-row__main">
        {label ? <p className="ledger-row__label">{label}</p> : null}
        <h3 className="ledger-row__title">{title}</h3>
        {summary ? <div className="ledger-row__summary">{summary}</div> : null}
      </div>
      {(meta || actions) ? (
        <div className="ledger-row__side">
          {meta ? <div className="ledger-row__meta">{meta}</div> : null}
          {actions ? <div className="ledger-row__actions">{actions}</div> : null}
        </div>
      ) : null}
    </>
  )

  const className = cx(
    "ledger-row",
    `ledger-row--${tone}`,
    active && "ledger-row--active",
    href && "ledger-row--link",
  )

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}

export function SplitTool({
  rail,
  main,
  detail,
  className,
}: {
  rail: ReactNode
  main: ReactNode
  detail?: ReactNode
  className?: string
}) {
  return (
    <section className={cx("split-tool", className)}>
      <aside className="split-tool__rail">{rail}</aside>
      <div className="split-tool__main">{main}</div>
      <aside className="split-tool__detail">{detail}</aside>
    </section>
  )
}

export function MarginalRail({
  kicker,
  title,
  children,
  tone = "quiet",
}: {
  kicker?: ReactNode
  title?: ReactNode
  children: ReactNode
  tone?: "quiet" | "warm" | "wood"
}) {
  return (
    <aside className={cx("marginal-rail", `marginal-rail--${tone}`)}>
      {kicker ? <p className="marginal-rail__kicker">{kicker}</p> : null}
      {title ? <h3 className="marginal-rail__title">{title}</h3> : null}
      <div className="marginal-rail__body">{children}</div>
    </aside>
  )
}

export function FocalPanel({
  kicker,
  title,
  lead,
  actions,
  aside,
  footer,
  tone = "default",
}: {
  kicker?: ReactNode
  title: ReactNode
  lead?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
  footer?: ReactNode
  tone?: "default" | "canopy" | "warm" | "wood"
}) {
  return (
    <section className={cx("focal-panel", `focal-panel--${tone}`)}>
      <div className="focal-panel__body">
        <div className="focal-panel__copy">
          {kicker ? <p className="focal-panel__kicker">{kicker}</p> : null}
          <h2 className="focal-panel__title">{title}</h2>
          {lead ? <div className="focal-panel__lead">{lead}</div> : null}
          {actions ? <div className="focal-panel__actions">{actions}</div> : null}
        </div>
        {aside ? <div className="focal-panel__aside">{aside}</div> : null}
      </div>
      {footer ? <div className="focal-panel__footer">{footer}</div> : null}
    </section>
  )
}

export function CanopyReveal({
  kicker,
  title,
  lead,
  items,
  footer,
}: {
  kicker?: ReactNode
  title: ReactNode
  lead?: ReactNode
  items: Array<{
    title: ReactNode
    meta?: ReactNode
    href?: string
  }>
  footer?: ReactNode
}) {
  return (
    <section className="canopy-reveal">
      <div className="canopy-reveal__art" aria-hidden="true">
        <div className="canopy-reveal__wash" />
        <div className="canopy-reveal__ribs" />
        <div className="canopy-reveal__marks" />
      </div>
      <div className="canopy-reveal__content">
        <div className="canopy-reveal__header">
          {kicker ? <p className="canopy-reveal__kicker">{kicker}</p> : null}
          <h2 className="canopy-reveal__title">{title}</h2>
          {lead ? <div className="canopy-reveal__lead">{lead}</div> : null}
        </div>
        <div className="canopy-reveal__nodes">
          {items.map((item, index) => {
            const style = { "--slot": index } as CSSProperties
            const content = (
              <>
                <span className="canopy-reveal__node-mark" aria-hidden="true" />
                <span className="canopy-reveal__node-copy">
                  <span className="canopy-reveal__node-title">{item.title}</span>
                  {item.meta ? (
                    <span className="canopy-reveal__node-meta">{item.meta}</span>
                  ) : null}
                </span>
              </>
            )

            return item.href ? (
              <Link
                key={String(index)}
                href={item.href}
                className="canopy-reveal__node"
                style={style}
              >
                {content}
              </Link>
            ) : (
              <div
                key={String(index)}
                className="canopy-reveal__node"
                style={style}
              >
                {content}
              </div>
            )
          })}
        </div>
        {footer ? <div className="canopy-reveal__footer">{footer}</div> : null}
      </div>
    </section>
  )
}

export function StatusRail({
  steps,
  note,
}: {
  steps: Array<{
    label: ReactNode
    detail?: ReactNode
    state?: "complete" | "current" | "upcoming" | "warning"
  }>
  note?: ReactNode
}) {
  return (
    <section className="status-rail">
      <ol className="status-rail__steps">
        {steps.map((step, index) => (
          <li
            key={String(index)}
            className={cx("status-rail__step", step.state && `status-rail__step--${step.state}`)}
          >
            <span className="status-rail__marker" aria-hidden="true">
              {index + 1}
            </span>
            <div className="status-rail__copy">
              <span className="status-rail__label">{step.label}</span>
              {step.detail ? <span className="status-rail__detail">{step.detail}</span> : null}
            </div>
          </li>
        ))}
      </ol>
      {note ? <div className="status-rail__note">{note}</div> : null}
    </section>
  )
}
