const statusColors = {
  Qualified: "bg-blue-100 text-blue-700",

  Proposal: "bg-amber-100 text-amber-700",

  Negotiation: "bg-purple-100 text-purple-700",

  Won: "bg-emerald-100 text-emerald-700",

  Lost: "bg-rose-100 text-rose-700",
};

const RecentLeads = ({ leads }) => {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Recent Leads</h3>

          <p className="mt-1 text-sm text-slate-500">Latest CRM activity</p>
        </div>

        <button className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="group cursor-pointer rounded-3xl border border-slate-100 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                  {lead.initials}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">{lead.name}</h4>

                  <p className="mt-1 text-sm text-slate-500">{lead.company}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                      {lead.source}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">
                  {lead.value}
                </p>

                <p className="mt-1 text-sm text-slate-400">Potential Revenue</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLeads;
