import { create } from "zustand";

const initialTasks = [
  {
    id: 1,
    title: "Follow up with Adobe",
    description: "Schedule demo meeting with Adobe team.",
    priority: "High",
    status: "To Do",
    assignee: "Pranjal",
    dueDate: "2026-05-20",
  },

  {
    id: 2,
    title: "Prepare Spotify Proposal",
    description: "Create proposal deck for Spotify CRM solution.",
    priority: "Medium",
    status: "In Progress",
    assignee: "Rahul",
    dueDate: "2026-05-21",
  },

  {
    id: 3,
    title: "Review Netflix Deal",
    description: "Review contract and pricing details.",
    priority: "High",
    status: "Review",
    assignee: "Aman",
    dueDate: "2026-05-22",
  },
];

const useTasksStore = create((set) => ({
  tasks: initialTasks,

  addTask: (task) =>
    set((state) => ({
      tasks: [
        {
          ...task,
          id: Date.now(),
        },

        ...state.tasks,
      ],
    })),

  updateTask: (id, updatedData) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedData,
            }
          : task,
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task,
      ),
    })),
}));

export default useTasksStore;
