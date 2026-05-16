import { useState } from "react";

import {
  DndContext,
  closestCorners,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

import ConfirmModal from "../../../components/ui/ConfirmModal";

import AddTaskModal from "../components/AddTaskModal";
import TaskCard from "../components/TaskCard";
import TasksHeader from "../components/TasksHeader";

import useTasks from "../hooks/useTasks";

import { taskStatuses } from "../constants/statuses";

const columnColors = {
  "To Do": "from-blue-500 to-indigo-600",

  "In Progress": "from-amber-400 to-orange-500",

  Review: "from-violet-500 to-purple-600",

  Completed: "from-emerald-500 to-green-600",
};

const DroppableColumn = ({ column, children, isHovered }) => {
  const { setNodeRef } = useDroppable({
    id: column.status,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-[calc(100vh-320px)] w-[420px] flex-shrink-0 flex-col rounded-[32px] bg-slate-100 transition-all duration-200 ${
        isHovered ? "scale-[1.01] ring-4 ring-blue-300 shadow-2xl" : ""
      }`}
    >
      {children}
    </div>
  );
};

const TasksPage = () => {
  const {
    groupedTasks,
    totalTasks,
    completedTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
  } = useTasks();

  const [openModal, setOpenModal] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);

  const [deleteTaskData, setDeleteTaskData] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const [hoveredColumn, setHoveredColumn] = useState(null);

  // Drag Start
  const handleDragStart = (event) => {
    const draggedTask = groupedTasks
      .flatMap((column) => column.tasks)
      .find((task) => task.id.toString() === event.active.id);

    setActiveTask(draggedTask);
  };

  // Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setHoveredColumn(null);

    if (!over) return;

    const taskId = Number(active.id);

    if (taskStatuses.includes(over.id)) {
      moveTask(taskId, over.id);
    }

    setActiveTask(null);
  };

  return (
    <div className="flex h-full flex-col gap-8">
      {/* Header */}
      <TasksHeader
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        onAddTask={() => {
          setEditingTask(null);

          setOpenModal(true);
        }}
      />

      {/* Add/Edit Modal */}
      <AddTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={editingTask}
        onSubmit={(data) => {
          if (editingTask) {
            updateTask(editingTask.id, data);
          } else {
            addTask(data);
          }
        }}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteTaskData}
        title="Delete Task"
        message={`Are you sure you want to delete "${deleteTaskData?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
        onClose={() => setDeleteTaskData(null)}
        onConfirm={() => {
          deleteTask(deleteTaskData.id);

          setDeleteTaskData(null);
        }}
      />

      {/* Board */}
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={(event) => {
          if (event.over?.id && taskStatuses.includes(event.over.id)) {
            setHoveredColumn(event.over.id);
          }
        }}
        onDragEnd={handleDragEnd}
      >
        <div className="hide-scrollbar flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex w-max gap-6 px-1">
            {groupedTasks.map((column) => (
              <DroppableColumn
                key={column.status}
                column={column}
                isHovered={hoveredColumn === column.status}
              >
                {/* Header */}
                <div
                  className={`rounded-t-[32px] bg-gradient-to-r px-6 py-5 text-white shadow-lg ${
                    columnColors[column.status]
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">{column.status}</h2>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
                      {column.tasks.length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                  {column.tasks.length > 0 ? (
                    column.tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onView={(task) => setSelectedTask(task)}
                        onEdit={(task) => {
                          setEditingTask(task);

                          setOpenModal(true);
                        }}
                        onDelete={(task) => setDeleteTaskData(task)}
                      />
                    ))
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white text-center text-sm font-medium text-slate-400">
                      No tasks
                    </div>
                  )}
                </div>
              </DroppableColumn>
            ))}
          </div>
        </div>

        {/* Overlay */}
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 opacity-90">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-bold text-slate-900">
                  {selectedTask.title}
                </h2>

                <p className="mt-2 text-slate-500">Task Details</p>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            {/* Grid */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-400">Assignee</p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {selectedTask.assignee}
                </h3>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-400">Due Date</p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {selectedTask.dueDate}
                </h3>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-400">Priority</p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {selectedTask.priority}
                </h3>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6">
                <p className="text-sm text-slate-400">Status</p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  {selectedTask.status}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 rounded-3xl bg-slate-50 p-6">
              <p className="text-sm text-slate-400">Description</p>

              <p className="mt-3 leading-8 text-slate-600">
                {selectedTask.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
