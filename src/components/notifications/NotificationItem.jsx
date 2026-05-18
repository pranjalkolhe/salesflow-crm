import { Briefcase, CheckCircle2, Users, X } from "lucide-react";

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

const NotificationItem = ({
  notification,

  onRemove,

  onRead,
}) => {
  const config = typeStyles[notification.type];

  const Icon = config?.icon || Briefcase;

  return (
    <div
      onClick={onRead}
      className={`group relative flex cursor-pointer items-start gap-4 rounded-3xl border p-4 transition-all ${
        notification.read
          ? "border-slate-100 bg-white"
          : "border-blue-100 bg-blue-50/60"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.bg}`}
      >
        <Icon size={20} className={config.color} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-slate-900">
              {notification.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {notification.message}
            </p>
          </div>

          {!notification.read && (
            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-500" />
          )}
        </div>

        <p className="mt-3 text-xs font-medium text-slate-400">
          {notification.time}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={(e) => {
          e.stopPropagation();

          onRemove();
        }}
        className="absolute right-3 top-3 opacity-0 transition group-hover:opacity-100"
      >
        <X size={16} className="text-slate-400 hover:text-red-500" />
      </button>
    </div>
  );
};

export default NotificationItem;
