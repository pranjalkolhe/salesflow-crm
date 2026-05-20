import { DollarSign, Target, TrendingUp, Users } from "lucide-react";
import ActivityFeedPanel from "@/components/activity/ActivityFeedPanel";
import AnalyticsCard from "../components/AnalyticsCard";
import RecentLeads from "../components/RecentLeads";
import RevenueChart from "../components/RevenueChart";
import TasksWidget from "../components/TasksWidget";

import useDashboard from "../hooks/useDashboard";

const DashboardPage = () => {
  const {
    totalLeads,
    wonDeals,
    lostDeals,
    totalRevenue,
    conversionRate,
    chartData,
    recentLeads,
  } = useDashboard();

  return (
    <div className="min-h-screen space-y-8 bg-slate-50 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's your CRM performance overview.
          </p>
        </div>

        <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl">
          Generate Report
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Leads"
          value={totalLeads}
          change="12%"
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
          icon={<Users size={28} />}
        />

        <AnalyticsCard
          title="Won Deals"
          value={wonDeals}
          change="8%"
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          icon={<Target size={28} />}
        />

        <AnalyticsCard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="15%"
          color="bg-gradient-to-br from-amber-400 to-orange-500"
          icon={<DollarSign size={28} />}
        />

        <AnalyticsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change="6%"
          color="bg-gradient-to-br from-violet-500 to-purple-600"
          icon={<TrendingUp size={28} />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Chart */}
        <div className="xl:col-span-2">
          <RevenueChart data={chartData} />
        </div>

        {/* Recent Leads */}
        <RecentLeads leads={recentLeads} />
      </div>

      {/* Bottom Widgets */}
      <div className="grid gap-6 xl:grid-cols-2">
        <ActivityFeedPanel />

        <TasksWidget />
      </div>

      {/* Lost Deals */}
      <div className="overflow-hidden rounded-[32px] border border-rose-100 bg-gradient-to-r from-rose-50 to-red-50 p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-rose-500">
              Lost Deals
            </p>

            <h2 className="mt-2 text-5xl font-bold text-rose-600">
              {lostDeals}
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Monitor your lost opportunities and analyze why deals are not
              converting to improve sales performance.
            </p>
          </div>

          <button className="rounded-2xl bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-rose-600">
            View Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
