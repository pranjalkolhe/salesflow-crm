import { Briefcase, CheckCircle2, Users } from "lucide-react";

const typeStyles = {
  deal: {
    icon: Briefcase,

    bg: "bg-blue-100",

    color: "text-blue-600",
  },

  task: {
    icon: CheckCircle2,

    bg: "bg-emerald-100",

    color: "text-emerald-600",
  },

  lead: {
    icon: Users,

    bg: "bg-violet-100",

    color: "text-violet-600",
  },
};

const ActivityItem = ({ activity }) => {
  const config = typeStyles[activity.type];

  const Icon = config?.icon || Briefcase;

  return (
    <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-4 transition hover:shadow-md">
      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.bg}`}
      >
        <Icon size={20} className={config.color} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{activity.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <span>{activity.user}</span>

          <span>•</span>

          <span>{activity.time}</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
