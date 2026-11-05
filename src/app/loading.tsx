export default function RootLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Top Navbar Placeholder */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 md:h-18 bg-white/95 border-b border-border-subtle px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-200 shrink-0" />
            <div className="w-36 h-5 bg-stone-200 rounded-lg" />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block w-32 h-9 bg-stone-200 rounded-lg" />
            <div className="w-28 sm:w-32 h-9 sm:h-10 bg-stone-200 rounded-xl" />
            <div className="w-20 h-9 sm:h-10 bg-stone-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton - card container matching actual HeroSection bounds */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-obsidian text-white min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 border border-white/10 shadow-xl">
            {/* Top Tagline Indicator Skeleton */}
            <div className="w-64 h-7 rounded-full bg-white/10" />

            {/* Center Copy Skeleton */}
            <div className="my-auto py-6 sm:py-8 max-w-3xl space-y-3 sm:space-y-4">
              <div className="w-56 sm:w-72 h-10 sm:h-14 bg-white/20 rounded-2xl" />
              <div className="w-4/5 max-w-xl h-6 sm:h-7 bg-white/15 rounded-xl" />
              <div className="w-full max-w-lg h-4 bg-white/10 rounded-lg" />
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
                <div className="w-44 h-11 bg-ochre-amber/30 rounded-xl" />
                <div className="w-40 h-11 bg-white/10 rounded-xl" />
              </div>
            </div>

            {/* Integrated Quick Filter Bar Skeleton */}
            <div className="w-full mt-4 bg-white/95 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end">
                <div className="sm:col-span-5 space-y-1.5">
                  <div className="w-28 h-3 bg-stone-300 rounded" />
                  <div className="h-11 bg-stone-200 rounded-xl w-full" />
                </div>
                <div className="sm:col-span-3 space-y-1.5">
                  <div className="w-24 h-3 bg-stone-300 rounded" />
                  <div className="h-11 bg-stone-200 rounded-xl w-full" />
                </div>
                <div className="sm:col-span-4">
                  <div className="h-11 bg-ochre-amber/30 rounded-xl w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section Skeleton (12-col: 5 left vs 7 right) */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative Skeleton */}
            <div className="lg:col-span-5 space-y-4">
              <div className="w-32 h-3.5 bg-stone-200 rounded" />
              <div className="w-4/5 h-8 sm:h-10 bg-stone-300 rounded-xl" />
              <div className="space-y-2">
                <div className="w-full h-3.5 bg-stone-200 rounded" />
                <div className="w-5/6 h-3.5 bg-stone-200 rounded" />
                <div className="w-3/4 h-3.5 bg-stone-200 rounded" />
              </div>
              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-border-subtle">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="w-16 h-7 bg-stone-300 rounded-lg" />
                    <div className="w-20 h-3 bg-stone-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right 3 Safety Cards Stack Skeleton */}
            <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-muted border border-border-subtle flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-border-subtle shrink-0" />
                  <div className="flex-1 space-y-2 w-full">
                    <div className="w-2/3 h-4 bg-stone-300 rounded" />
                    <div className="w-full h-3 bg-stone-200 rounded" />
                    <div className="w-4/5 h-3 bg-stone-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Skeleton (4 cols highlight card vs 8 cols 4 package cards) */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Left Obsidian Highlight Skeleton */}
            <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl bg-obsidian text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border border-border-subtle min-h-[440px]">
              <div className="space-y-4">
                <div className="w-36 h-3 bg-white/20 rounded" />
                <div className="w-3/4 h-8 bg-white/30 rounded-xl" />
                <div className="space-y-2">
                  <div className="w-full h-3 bg-white/15 rounded" />
                  <div className="w-5/6 h-3 bg-white/15 rounded" />
                </div>
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-white/20 shrink-0" />
                      <div className="w-48 h-3 bg-white/15 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 space-y-2">
                <div className="w-48 h-3 bg-white/15 rounded" />
                <div className="w-full h-11 bg-river-teal/30 rounded-xl" />
              </div>
            </div>

            {/* Right 4 Packages Grid Skeleton */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-xl sm:rounded-2xl border border-border-subtle bg-white flex flex-col justify-between p-5 sm:p-6 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-5 bg-stone-200 rounded-md" />
                      <div className="w-16 h-4 bg-stone-200 rounded" />
                    </div>
                    <div className="w-3/4 h-5 bg-stone-300 rounded" />
                    <div className="pb-3 border-b border-border-subtle space-y-1">
                      <div className="w-32 h-6 bg-stone-300 rounded-md" />
                      <div className="w-36 h-3 bg-stone-200 rounded" />
                    </div>
                    <div className="space-y-2 pt-1">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded bg-stone-200 shrink-0" />
                          <div className="w-36 h-3 bg-stone-100 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="h-11 bg-stone-200 rounded-xl" />
                    <div className="h-11 bg-ochre-amber/30 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Steps Skeleton */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-stone-muted border-t border-b border-border-subtle">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
            <div className="w-28 h-3.5 bg-stone-300 rounded mx-auto" />
            <div className="w-64 sm:w-80 h-7 bg-stone-300 rounded-xl mx-auto" />
            <div className="w-full sm:w-96 h-3 bg-stone-200 rounded mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-border-subtle flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-8 bg-stone-200 rounded" />
                  <div className="w-10 h-10 rounded-lg bg-stone-100" />
                </div>
                <div className="w-40 h-5 bg-stone-300 rounded" />
                <div className="space-y-1.5">
                  <div className="w-full h-3 bg-stone-200 rounded" />
                  <div className="w-5/6 h-3 bg-stone-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-3">
            <div className="space-y-2">
              <div className="w-24 h-3 bg-stone-200 rounded" />
              <div className="w-64 sm:w-80 h-7 bg-stone-300 rounded-xl" />
            </div>
            <div className="w-48 h-5 bg-stone-200 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-stone-muted border border-border-subtle flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="w-24 h-4 bg-stone-300 rounded" />
                  <div className="space-y-1.5">
                    <div className="w-full h-3 bg-stone-200 rounded" />
                    <div className="w-full h-3 bg-stone-200 rounded" />
                    <div className="w-4/5 h-3 bg-stone-200 rounded" />
                  </div>
                </div>
                <div className="pt-3.5 border-t border-border-subtle flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 shrink-0" />
                  <div className="space-y-1">
                    <div className="w-28 h-3.5 bg-stone-300 rounded" />
                    <div className="w-20 h-3 bg-stone-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-stone-muted border-t border-border-subtle">
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <div className="w-28 h-3.5 bg-stone-300 rounded mx-auto" />
            <div className="w-64 sm:w-80 h-7 bg-stone-300 rounded-xl mx-auto" />
            <div className="w-72 h-3 bg-stone-200 rounded mx-auto" />
          </div>

          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-border-subtle p-4 sm:p-5 flex items-center justify-between"
              >
                <div className="w-3/4 h-4 bg-stone-200 rounded" />
                <div className="w-4 h-4 bg-stone-200 rounded shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Basecamp Section Skeleton */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="w-36 h-3 bg-stone-200 rounded" />
              <div className="w-4/5 h-8 bg-stone-300 rounded-xl" />
              <div className="w-full h-12 bg-stone-100 rounded-lg" />
              <div className="space-y-3 pt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-stone-200 rounded shrink-0 mt-0.5" />
                    <div className="space-y-1 w-full">
                      <div className="w-24 h-3 bg-stone-300 rounded" />
                      <div className="w-4/5 h-3 bg-stone-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-52 h-11 bg-stone-300 rounded-xl mt-4" />
            </div>

            <div className="lg:col-span-7 rounded-2xl md:rounded-3xl bg-stone-200 aspect-[16/10] max-h-[380px] w-full" />
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-obsidian py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20" />
              <div className="w-36 h-5 bg-white/30 rounded" />
            </div>
            <div className="w-4/5 h-12 bg-white/10 rounded-lg" />
          </div>
          <div className="md:col-span-3 space-y-2">
            <div className="w-28 h-4 bg-white/20 rounded" />
            <div className="space-y-1.5 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-36 h-3 bg-white/10 rounded" />
              ))}
            </div>
          </div>
          <div className="md:col-span-4 space-y-2">
            <div className="w-28 h-4 bg-white/20 rounded" />
            <div className="w-full h-10 bg-white/10 rounded-lg" />
            <div className="w-36 h-3 bg-white/10 rounded" />
          </div>
        </div>
      </footer>
    </div>
  );
}
