export default function PackagesCatalogLoading() {
  return (
    <div className="min-h-screen bg-stone-muted animate-pulse">
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

      <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header Section Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="w-32 h-3.5 bg-stone-300 rounded mx-auto" />
          <div className="w-3/4 sm:w-1/2 h-10 sm:h-12 bg-stone-300 rounded-2xl mx-auto" />
          <div className="w-full sm:w-4/5 h-4 bg-stone-200 rounded mx-auto" />
        </div>

        {/* Search and Category Filter Toolbar Skeleton */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-border-subtle shadow-xs mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-28 sm:w-32 h-9 bg-stone-200 rounded-xl shrink-0"
              />
            ))}
          </div>
          <div className="min-w-[240px] sm:min-w-[280px] h-10 bg-stone-100 rounded-xl border border-border-subtle" />
        </div>

        {/* Packages Grid Skeleton (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-border-subtle overflow-hidden flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Photo Container Placeholder */}
                <div className="relative aspect-[16/10] bg-stone-300 w-full overflow-hidden">
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="w-20 h-5 bg-stone-400/40 rounded-md" />
                    <div className="w-16 h-5 bg-ochre-amber/30 rounded-md" />
                  </div>
                </div>

                {/* Body Content Placeholder */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-3.5 bg-stone-200 rounded" />
                    <div className="w-24 h-3.5 bg-stone-200 rounded" />
                  </div>

                  <div className="w-4/5 h-6 bg-stone-300 rounded-lg" />

                  <div className="space-y-1.5">
                    <div className="w-full h-3 bg-stone-200 rounded" />
                    <div className="w-5/6 h-3 bg-stone-200 rounded" />
                  </div>

                  <div className="pb-4 border-b border-border-subtle space-y-1">
                    <div className="w-36 h-6 bg-stone-300 rounded-md" />
                  </div>

                  <div className="space-y-2 pt-1">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded bg-stone-200 shrink-0" />
                        <div className="w-44 h-3 bg-stone-100 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Placeholder */}
              <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2">
                <div className="h-11 bg-stone-200 rounded-xl" />
                <div className="h-11 bg-ochre-amber/30 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
