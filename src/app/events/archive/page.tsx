import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { getArchiveEvents, getRegionMap } from "@/lib/hub/queries"
import { formatEventDate, formatLocation } from "@/lib/hub/format"

export const metadata: Metadata = {
  title: "Events archive",
  description: "A quiet museum of past HUBYPAA events.",
}

export const dynamic = "force-dynamic"

export default async function ArchivePage() {
  const events = await getArchiveEvents()
  const regions = await getRegionMap()

  // Group by year for a gentle reading rhythm.
  const byYear = new Map<number, typeof events>()
  for (const e of events) {
    const y = Number(e.date.slice(0, 4))
    const list = byYear.get(y) ?? []
    list.push(e)
    byYear.set(y, list)
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a)

  return (
    <>
      <PortalHeader
        kicker="Archive"
        title="Past events, kept."
        subtitle="A quiet museum of what came before. Registration links are not surfaced here."
      />

      <section className="shell pb-16">
        {events.length === 0 ? (
          <div className="altar text-center">
            <p className="altar__label">Archive</p>
            <h2 className="altar__title">The museum is empty for now.</h2>
            <p className="altar__summary mx-auto">
              As events come and go, this page fills on its own. Look at
              what&rsquo;s{" "}
              <Link href="/events" className="underline">upcoming</Link> instead.
            </p>
          </div>
        ) : (
          years.map((year) => (
            <div key={year} className="mt-16 first:mt-0">
              <div className="flex items-baseline justify-between border-b border-[var(--color-border-2)] pb-4">
                <h2 className="display-2">{year}</h2>
                <p className="body-sm">{byYear.get(year)!.length} events</p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {byYear.get(year)!.map((e) => (
                  <figure
                    key={e.id}
                    className="group card card-quiet overflow-hidden p-0"
                  >
                    {e.flyerPath ? (
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={e.flyerPath}
                          alt={`Archived flyer: ${e.title}`}
                          fill
                          className="object-cover grayscale-[0.25] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center border-b border-[var(--color-border-2)] bg-[var(--color-surface-2)]">
                        <p className="mono text-xs text-[var(--color-fg-3)]">no flyer</p>
                      </div>
                    )}
                    <figcaption className="p-5">
                      <p className="mono text-[10px] uppercase tracking-wider text-[var(--color-fg-3)]">
                        {regions.get(e.regionId)?.label ?? "—"}
                      </p>
                      <p className="mt-2 text-sm font-medium text-[var(--color-fg)]">{e.title}</p>
                      <p className="body-sm mt-1">
                        {formatEventDate(e.date, e.endDate)}
                      </p>
                      <p className="body-sm">{formatLocation(e.city, e.state)}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </>
  )
}