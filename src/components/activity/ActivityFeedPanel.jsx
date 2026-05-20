import ActivityItem from "./ActivityItem";

import useActivityStore from "@/store/useActivityStore";

const ActivityFeedPanel = () => {
  const { activities } = useActivityStore();

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Activity Feed</h2>

        <p className="mt-1 text-sm text-slate-500">
          Track CRM workflow activity
        </p>
      </div>

      {/* List */}
      <div className="hide-scrollbar flex max-h-[520px] flex-col gap-4 overflow-y-auto">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeedPanel;
