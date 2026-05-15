const DealsHeader = ({ onAddDeal, totalDeals, totalValue, wonDeals }) => {
  return (
    <div className="space-y-4">
      {/* Top */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Deals Pipeline
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your sales workflow and revenue pipeline.
          </p>
        </div>

        <button
          onClick={onAddDeal}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
        >
          Add Deal
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Deals</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {totalDeals}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Pipeline Value</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            ${totalValue.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Won Deals</p>

          <h2 className="mt-3 text-4xl font-bold text-emerald-600">
            {wonDeals}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default DealsHeader;
