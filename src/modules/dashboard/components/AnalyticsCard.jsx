const AnalyticsCard = ({ title, value, change, icon, color }) => {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl opacity-10 ${color}`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
              ↑ {change}
            </span>

            <span className="text-sm text-slate-400">vs last month</span>
          </div>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-3xl text-white shadow-lg ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
