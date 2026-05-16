const TasksHeader = ({ totalTasks, completedTasks, onAddTask }) => {
  return (
    <div className="space-y-6">
      {/* Top */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Tasks Workspace
          </h1>

          <p className="mt-2 text-slate-500">
            Organize and track your CRM productivity workflow.
          </p>
        </div>

        <button
          onClick={onAddTask}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
        >
          Add Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Tasks</p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {totalTasks}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Completed</p>

          <h2 className="mt-3 text-4xl font-bold text-emerald-600">
            {completedTasks}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TasksHeader;
