import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = ["#2563EB", "#F59E0B", "#9333EA", "#22C55E", "#F43F5E"];

const RevenueChart = ({ data }) => {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            Sales Pipeline
          </h3>

          <p className="mt-2 text-slate-500">Lead stage performance overview</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            This Month
          </button>

          <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 border-b border-slate-100 p-8 md:grid-cols-3">
        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-600">Total Pipeline</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {data.reduce((acc, item) => acc + item.value, 0)}
          </h2>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-600">Won Deals</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {data.find((item) => item.name === "Won")?.value || 0}
          </h2>
        </div>

        <div className="rounded-2xl bg-rose-50 p-5">
          <p className="text-sm font-semibold text-rose-600">Lost Deals</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {data.find((item) => item.name === "Lost")?.value || 0}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[450px] p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={58}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F0"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 14,
                fontWeight: 600,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#94A3B8",
                fontSize: 13,
              }}
            />

            <Tooltip
              cursor={{
                fill: "#F8FAFC",
              }}
              contentStyle={{
                borderRadius: 20,
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            />

            <Bar dataKey="value" radius={[18, 18, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-t border-slate-100 p-6">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: COLORS[index],
              }}
            />

            <span className="text-sm font-semibold text-slate-700">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
