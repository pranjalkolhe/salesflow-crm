import { CircleDollarSign, Target, TrendingUp, Users } from "lucide-react";

const LeadsStats = ({ totalLeads, wonDeals, lostDeals, revenue }) => {
  const stats = [
    {
      title: "Total Leads",
      value: totalLeads,
      icon: <Users size={24} />,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },

    {
      title: "Won Deals",
      value: wonDeals,
      icon: <Target size={24} />,
      color: "from-emerald-500 to-green-600",
      bg: "bg-gradient-to-br from-emerald-50 to-green-50",
    },

    {
      title: "Lost Deals",
      value: lostDeals,
      icon: <TrendingUp size={24} />,
      color: "from-rose-500 to-red-600",
      bg: "bg-gradient-to-br from-rose-50 to-red-50",
    },

    {
      title: "Revenue",
      value: revenue,
      icon: <CircleDollarSign size={24} />,
      color: "from-amber-400 to-orange-500",
      bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`group relative overflow-hidden rounded-[28px] border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stat.bg}`}
        >
          {/* Glow */}
          <div
            className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-3xl ${stat.color}`}
          />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-3 text-sm text-slate-400">Updated this month</p>
            </div>

            <div
              className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br text-white shadow-lg ${stat.color}`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadsStats;
