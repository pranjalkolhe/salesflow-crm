import { useEffect, useState } from "react";

const statuses = ["To Do", "In Progress", "Review", "Completed"];

const priorities = ["High", "Medium", "Low"];

const initialForm = {
  title: "",
  description: "",
  priority: "Medium",
  status: "To Do",
  assignee: "",
  dueDate: "",
};

const AddTaskModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setFormData(initialData || initialForm);
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setFormData(initialForm);

    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData(initialForm);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {initialData ? "Edit Task" : "Create Task"}
            </h2>

            <p className="mt-2 text-slate-500">
              Organize your CRM productivity workflow.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold transition hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-blue-500"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            rows={5}
            className="w-full rounded-2xl border border-slate-200 p-5 outline-none focus:border-blue-500"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Assignee"
              className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-blue-500"
            />

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-blue-500"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-blue-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-blue-500"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              {initialData ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
