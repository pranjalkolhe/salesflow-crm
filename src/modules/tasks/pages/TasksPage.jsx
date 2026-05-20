import { useState } from "react";
import useNotificationStore from "@/store/useNotificationStore";
import useToastStore from "@/store/useToastStore";
import useActivityLogger from "@/components/activity/useActivityLogger";
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
import TaskDetailsDrawer from "../components/TaskDetailsDrawer";

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
  const { addNotification } = useNotificationStore();
  const { addToast } = useToastStore();
  const { logActivity } = useActivityLogger();

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
      const activeTask = groupedTasks
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId);

      // Prevent same-column drop
      if (activeTask?.status === over.id) {
        return;
      }
      moveTask(taskId, over.id);

      const movedTask = groupedTasks
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId);

      if (movedTask) {
        logActivity({
          type: "task",

          title: `${movedTask.title} moved to ${over.id}`,
        });

        addNotification({
          type: "task",

          title: "Task moved",

          message: `${movedTask.title} moved to ${over.id}.`,

          time: "Just now",
        });
        addToast({
          type: "task",

          title: "Task created",

          message: `${data.title} added successfully.`,
        });
        addToast({
          type: "task",

          title: "Task deleted",

          message: `${deleteTaskData.title} removed from workflow.`,
        });
        addToast({
          type: "task",

          title: "Task moved",

          message: `${movedTask.title} moved to ${over.id}.`,
        });
      }
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

            logActivity({
              type: "task",

              title: `${data.title} task updated`,
            });

            addNotification({
              type: "task",

              title: "Task updated",

              message: `${data.title} updated successfully.`,

              time: "Just now",
            });
          } else {
            addTask(data);

            logActivity({
              type: "task",

              title: `${data.title} task created`,
            });

            addNotification({
              type: "task",

              title: "New task created",

              message: `${data.title} added successfully.`,

              time: "Just now",
            });
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

          logActivity({
            type: "task",

            title: `${deleteTaskData.title} deleted`,
          });

          addNotification({
            type: "task",

            title: "Task deleted",

            message: `${deleteTaskData.title} removed from workflow.`,

            time: "Just now",
          });

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
      <TaskDetailsDrawer
        task={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </div>
  );
};

export default TasksPage;
