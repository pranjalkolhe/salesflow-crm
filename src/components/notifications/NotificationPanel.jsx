import NotificationItem from "./NotificationItem";

import useNotificationStore from "@/store/useNotificationStore";

const NotificationPanel = ({ open }) => {
  const {
    notifications,

    markAsRead,

    markAllAsRead,

    removeNotification,
  } = useNotificationStore();

  if (!open) return null;

  return (
    <div className="absolute right-0 top-16 z-[999] w-[420px] overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Notifications</h2>

          <p className="text-sm text-slate-500">
            Stay updated with CRM activity
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          Mark all read
        </button>
      </div>

      {/* List */}
      <div className="hide-scrollbar flex max-h-[500px] flex-col gap-3 overflow-y-auto p-4">
        {notifications.length === 0 ? (
          <div className="py-14 text-center text-slate-400">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id)}
              onRemove={() => removeNotification(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
