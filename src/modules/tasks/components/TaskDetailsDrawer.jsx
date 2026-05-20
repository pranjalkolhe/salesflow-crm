import { CalendarDays, CheckCircle2, Flag, User2 } from "lucide-react";

import Drawer from "@/components/ui/Drawer";

const priorityColors = {
  High: "bg-rose-100 text-rose-600",

  Medium: "bg-amber-100 text-amber-600",

  Low: "bg-blue-100 text-blue-600",
};

const TaskDetailsDrawer = ({ task, open, onClose }) => {
  if (!task) return null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={task.title}
      subtitle="Task Details"
      width="max-w-lg"
    >
      <div className="space-y-6">
        {/* Assignee */}
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
              <User2 size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Assignee</p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {task.assignee}
              </h3>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Status</p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {task.status}
              </h3>
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
              <Flag size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Priority</p>

              <span
                className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Due Date */}
        <div className="rounded-3xl bg-slate-50 p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-violet-100 p-3 text-violet-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Due Date</p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {task.dueDate}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Description</p>

          <p className="mt-3 leading-7 text-slate-600">
            {task.description || "No description available."}
          </p>
        </div>
      </div>
    </Drawer>
  );
};

export default TaskDetailsDrawer;
