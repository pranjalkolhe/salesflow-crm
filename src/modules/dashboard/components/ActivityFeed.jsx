import { CheckCircle2, Clock3 } from "lucide-react";

const activities = [
  {
    user: "Aman Gupta",
    action: "moved deal to Qualified",
    time: "2h ago",
  },

  {
    user: "Sarah Johnson",
    action: "sent proposal",
    time: "5h ago",
  },

  {
    user: "Rahul Patil",
    action: "scheduled follow-up meeting",
    time: "1d ago",
  },
];

const ActivityFeed = () => {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Activity Feed</h3>

          <p className="mt-1 text-sm text-slate-500">Recent CRM updates</p>
        </div>

        <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <CheckCircle2 size={20} />
              </div>

              {index !== activities.length - 1 && (
                <div className="mt-2 h-full w-[2px] bg-slate-200" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">
                  {activity.user}
                </h4>

                <div className="flex items-center gap-1 text-sm text-slate-400">
                  <Clock3 size={14} />

                  {activity.time}
                </div>
              </div>

              <p className="mt-2 text-sm text-slate-500">{activity.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
