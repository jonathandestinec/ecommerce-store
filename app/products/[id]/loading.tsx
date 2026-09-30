import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoading() {
  return (
    <main aria-busy="true" aria-label="Loading product" className="mx-auto w-full max-w-7xl px-5 pb-14 pt-8 md:px-7 md:pt-12">
      <p role="status" className="sr-only">Loading product…</p>

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-3.5 w-10" />
        <Skeleton className="h-3.5 w-3" />
        <Skeleton className="h-3.5 w-14" />
        <Skeleton className="h-3.5 w-3" />
        <Skeleton className="h-3.5 w-32" />
      </div>

      <div className="grid gap-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,.95fr)] lg:gap-12">
        {/* Gallery */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-4">
          <div className="order-2 flex gap-2 overflow-hidden sm:order-1 sm:flex-col">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="size-16 shrink-0 rounded-none sm:size-14" />
            ))}
          </div>
          <Skeleton className="order-1 aspect-[.78] w-full rounded-none sm:order-2 sm:aspect-[.75]" />
        </div>

        {/* Details */}
        <section>
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="mt-2 h-9 w-3/4" />
          <Skeleton className="mt-3 h-4 w-36" />
          <div className="mt-4 flex items-center gap-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="mt-5 h-4 w-52" />
          <Skeleton className="mt-5 h-12 w-full rounded-md" />

          <Skeleton className="mt-5 h-4 w-40" />
          <Skeleton className="mt-2 h-1 w-full rounded-full" />

          <div className="mt-6">
            <Skeleton className="h-4 w-20" />
            <div className="mt-3 flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-12 rounded" />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Skeleton className="h-4 w-28" />
            <div className="mt-3 flex gap-2.5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="size-7 rounded-full" />
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[112px_1fr] gap-3">
            <Skeleton className="h-11 w-full rounded-none" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="mt-5 divide-y divide-[#eee] border-y border-[#eee]">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="my-3 h-5 w-full rounded-none" />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
