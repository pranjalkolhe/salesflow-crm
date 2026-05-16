import { Calendar, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useDraggable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

const priorityColors = {
  High: "bg-rose-100 text-rose-600",

  Medium: "bg-amber-100 text-amber-600",

  Low: "bg-blue-100 text-blue-600",
};

const TaskCard = ({ task, onView, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id.toString(),
    });

  const style = {
    transform: CSS.Translate.toString(transform),

    opacity: isDragging ? 0 : 1,
  };

  const [openMenu, setOpenMenu] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {task.description}
          </p>
        </div>

        {/* Actions */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();

              setOpenMenu(!openMenu);
            }}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <MoreVertical size={18} />
          </button>

          {openMenu && (
            <div className="absolute right-0 top-12 z-50 w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
              <button
                onClick={() => {
                  onView(task);

                  setOpenMenu(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Eye size={16} />
                View
              </button>

              <button
                onClick={() => {
                  onEdit(task);

                  setOpenMenu(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  onDelete(task);

                  setOpenMenu(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drag Area */}
      <div
        {...listeners}
        {...attributes}
        className="mt-5 cursor-grab active:cursor-grabbing"
      >
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Assignee</p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {task.assignee}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Due Date</p>

            <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-700">
              <Calendar size={14} />

              {task.dueDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
