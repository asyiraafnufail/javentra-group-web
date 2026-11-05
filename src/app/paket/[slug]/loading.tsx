export default function PackageDetailLoading() {
  return (
    <div className="min-h-screen bg-stone-muted animate-pulse">
      {/* Top Navbar Placeholder */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 md:h-18 bg-white/95 border-b border-border-subtle px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-200 shrink-0" />
            {/* Mobile (< md): 2 baris rapat */}
            <div className="flex md:hidden flex-col justify-center h-10 -space-y-0.5">
              <div className="w-20 h-4 bg-stone-300 rounded" />
              <div className="w-14 h-3 bg-stone-200 rounded mt-0.5" />
            </div>
            {/* iPad & Desktop (>= md): 1 baris memanjang */}
            <div className="hidden md:block w-40 h-5 bg-stone-300 rounded" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block w-32 h-9 bg-stone-200 rounded-lg" />
            <div className="w-28 sm:w-32 h-9 sm:h-10 bg-stone-200 rounded-xl" />
            <div className="w-20 h-9 sm:h-10 bg-stone-200 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="pt-20 sm:pt-24 pb-16 sm:pb-24">
        {/* Breadcrumb Navigation Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2">
            <div className="w-16 h-3 bg-stone-200 rounded" />
            <div className="w-3 h-3 bg-stone-200 rounded" />
            <div className="w-20 h-3 bg-stone-200 rounded" />
            <div className="w-3 h-3 bg-stone-200 rounded" />
            <div className="w-36 h-3 bg-stone-300 rounded" />
          </div>
        </div>

        {/* Hero Photographic Banner Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-obsidian text-white min-h-[340px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10 lg:p-12 border border-white/10 shadow-xl">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-24 h-6 rounded-md bg-white/20" />
                <div className="w-32 h-6 rounded-md bg-ochre-amber/30" />
              </div>
              <div className="w-4/5 h-10 sm:h-14 bg-white/30 rounded-2xl" />
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <div className="w-28 h-5 bg-white/15 rounded-md" />
                <div className="w-36 h-5 bg-white/15 rounded-md" />
                <div className="w-32 h-5 bg-white/15 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: 8-col detail vs 4-col sticky booking card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 8 Columns */}
            <div className="lg:col-span-8 space-y-8 sm:space-y-10">
              {/* Card 1: Description & Highlights */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border-subtle shadow-xs space-y-5">
                <div className="space-y-2">
                  <div className="w-32 h-3 bg-stone-200 rounded" />
                  <div className="w-56 h-7 bg-stone-300 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3.5 bg-stone-200 rounded" />
                  <div className="w-full h-3.5 bg-stone-200 rounded" />
                  <div className="w-4/5 h-3.5 bg-stone-200 rounded" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-stone-muted border border-border-subtle space-y-2"
                    >
                      <div className="w-32 h-4 bg-stone-300 rounded" />
                      <div className="w-full h-3 bg-stone-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Inclusions & Exclusions */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border-subtle shadow-xs space-y-6">
                <div className="space-y-4">
                  <div className="w-48 h-6 bg-stone-300 rounded-xl" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded bg-stone-200 shrink-0" />
                        <div className="w-44 h-3 bg-stone-200 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-border-subtle space-y-4">
                  <div className="w-44 h-5 bg-stone-300 rounded-lg" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded bg-stone-100 shrink-0" />
                        <div className="w-36 h-3 bg-stone-100 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3: Itinerary / Rundown */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-border-subtle shadow-xs space-y-5">
                <div className="w-52 h-6 bg-stone-300 rounded-xl" />
                <div className="space-y-4 pt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-stone-muted border border-border-subtle flex items-start gap-4"
                    >
                      <div className="w-20 h-7 bg-stone-300 rounded-lg shrink-0" />
                      <div className="space-y-1.5 w-full">
                        <div className="w-44 h-4 bg-stone-300 rounded" />
                        <div className="w-5/6 h-3 bg-stone-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Sticky Booking Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-border-subtle shadow-md space-y-5">
                <div className="space-y-2">
                  <div className="w-24 h-3.5 bg-stone-200 rounded" />
                  <div className="w-48 h-8 bg-stone-300 rounded-xl" />
                  <div className="w-36 h-3 bg-stone-200 rounded" />
                </div>

                <div className="space-y-3 pt-3 border-t border-border-subtle">
                  <div className="h-10 bg-stone-100 rounded-xl" />
                  <div className="h-10 bg-stone-100 rounded-xl" />
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="h-12 bg-ochre-amber/30 rounded-xl w-full" />
                  <div className="h-10 bg-stone-200 rounded-xl w-full" />
                </div>

                <div className="w-4/5 h-3 bg-stone-100 rounded mx-auto" />
              </div>

              <div className="bg-white rounded-2xl border border-border-subtle p-5 space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded bg-stone-200 shrink-0" />
                    <div className="w-44 h-3 bg-stone-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Packages Carousel / Grid Skeleton */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-border-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="w-28 h-3 bg-stone-200 rounded" />
                <div className="w-64 h-6 bg-stone-300 rounded-xl" />
              </div>
              <div className="w-24 h-4 bg-stone-200 rounded" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-border-subtle p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-20 h-5 bg-stone-200 rounded" />
                    <div className="w-44 h-5 bg-stone-300 rounded" />
                    <div className="space-y-1">
                      <div className="w-full h-3 bg-stone-200 rounded" />
                      <div className="w-4/5 h-3 bg-stone-200 rounded" />
                    </div>
                    <div className="w-32 h-6 bg-stone-300 rounded-md" />
                  </div>
                  <div className="h-9 bg-stone-200 rounded-xl w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
