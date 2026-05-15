import { CheckCircle2, Circle, Clock3 } from "lucide-react";

import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Follow up with Sarah",
    priority: "High",
    time: "11:30 AM",
    completed: false,
  },

  {
    id: 2,
    title: "Send proposal to Adobe",
    priority: "Medium",
    time: "02:00 PM",
    completed: false,
  },

  {
    id: 3,
    title: "Call Rahul Patil",
    priority: "High",
    time: "04:30 PM",
    completed: true,
  },
];

const priorityColors = {
  High: "bg-rose-100 text-rose-600",

  Medium: "bg-amber-100 text-amber-600",

  Low: "bg-blue-100 text-blue-600",
};

const TasksWidget = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Tasks Due Today</h3>

          <p className="mt-1 text-sm text-slate-500">
            Track your daily CRM tasks
          </p>
        </div>

        <button className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100">
          View All
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6 rounded-3xl bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Completed</p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              {completedTasks}/{tasks.length}
            </h2>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <CheckCircle2 size={28} />
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-center justify-between rounded-3xl border p-5 transition-all duration-200 ${
              task.completed
                ? "border-emerald-100 bg-emerald-50"
                : "border-slate-100 bg-slate-50 hover:border-blue-100 hover:bg-white hover:shadow-lg"
            }`}
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? (
                  <CheckCircle2 size={24} className="text-emerald-500" />
                ) : (
                  <Circle
                    size={24}
                    className="text-slate-300 transition group-hover:text-blue-500"
                  />
                )}
              </button>

              <div>
                <h4
                  className={`font-semibold ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {task.title}
                </h4>

                <div className="mt-2 flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority} Priority
                  </span>

                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <Clock3 size={14} />

                    {task.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksWidget;
