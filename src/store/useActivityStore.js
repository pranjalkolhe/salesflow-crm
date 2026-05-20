import { create } from "zustand";

const useActivityStore = create((set) => ({
  activities: [
    {
      id: 1,

      type: "deal",

      title: "Adobe deal moved to Negotiation",

      user: "Pranjal",

      time: "2 min ago",
    },

    {
      id: 2,

      type: "task",

      title: "Follow-up task completed",

      user: "Rahul",

      time: "10 min ago",
    },
  ],

  addActivity: (activity) =>
    set((state) => ({
      activities: [
        {
          id: Date.now(),

          ...activity,
        },

        ...state.activities,
      ],
    })),
}));

export default useActivityStore;
