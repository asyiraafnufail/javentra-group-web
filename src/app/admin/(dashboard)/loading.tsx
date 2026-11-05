export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6 sm:space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="w-56 h-8 bg-stone-200 rounded-xl" />
          <div className="w-72 h-4 bg-stone-200 rounded" />
        </div>
        <div className="w-32 h-10 bg-stone-200 rounded-xl" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-border-subtle flex justify-between items-center">
            <div className="space-y-2">
              <div className="w-20 h-3 bg-stone-200 rounded" />
              <div className="w-12 h-8 bg-stone-300 rounded" />
              <div className="w-24 h-2.5 bg-stone-100 rounded" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-stone-100 shrink-0" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 space-y-4">
        <div className="w-40 h-6 bg-stone-200 rounded" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-stone-50 border border-border-subtle rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
