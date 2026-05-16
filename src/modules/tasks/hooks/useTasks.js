import useTasksStore from "../store/useTasksStore";

const statuses = ["To Do", "In Progress", "Review", "Completed"];

const useTasks = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasksStore();

  const groupedTasks = statuses.map((status) => ({
    status,

    tasks: tasks.filter((task) => task.status === status),
  }));

  return {
    tasks,
    groupedTasks,

    totalTasks: tasks.length,

    completedTasks: tasks.filter((task) => task.status === "Completed").length,

    addTask,
    updateTask,
    deleteTask,
    moveTask,
  };
};

export default useTasks;
