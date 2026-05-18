import { create } from "zustand";

const useNotificationStore =
  create((set) => ({
    notifications: [
      {
        id: 1,

        type: "deal",

        title:
          "New deal created",

        message:
          "Adobe deal added to pipeline.",

        time: "2 min ago",

        read: false,
      },

      {
        id: 2,

        type: "task",

        title:
          "Task completed",

        message:
          "Follow-up task marked as completed.",

        time: "10 min ago",

        read: false,
      },
    ],

    addNotification: (
      notification
    ) =>
      set((state) => ({
        notifications: [
          {
            id: Date.now(),

            read: false,

            ...notification,
          },

          ...state.notifications,
        ],
      })),

    markAsRead: (id) =>
      set((state) => ({
        notifications:
          state.notifications.map(
            (
              notification
            ) =>
              notification.id ===
              id
                ? {
                    ...notification,

                    read: true,
                  }
                : notification
          ),
      })),

    markAllAsRead: () =>
      set((state) => ({
        notifications:
          state.notifications.map(
            (
              notification
            ) => ({
              ...notification,

              read: true,
            })
          ),
      })),

    removeNotification:
      (id) =>
        set((state) => ({
          notifications:
            state.notifications.filter(
              (
                notification
              ) =>
                notification.id !==
                id
            ),
        })),
  }));

export default useNotificationStore;