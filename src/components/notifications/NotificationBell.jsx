import { Bell } from "lucide-react";
import { useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";
import { useState } from "react";

import NotificationPanel from "./NotificationPanel";

import useNotificationStore from "@/store/useNotificationStore";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  const { notifications } = useNotificationStore();

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const panelRef = useRef(null);

  useOutsideClick(panelRef, () => setOpen(false));

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md"
      >
        <Bell size={20} className="text-slate-600" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <NotificationPanel open={open} />
    </div>
  );
};

export default NotificationBell;
