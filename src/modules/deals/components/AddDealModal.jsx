import { useEffect, useState } from "react";

import {
  CalendarDays,
  CircleDollarSign,
  User2,
  Building2,
  FileText,
  Layers3,
  Flag,
} from "lucide-react";

const stages = ["Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const priorities = ["High", "Medium", "Low"];

const sources = [
  "Website",
  "Referral",
  "Cold Email",
  "LinkedIn",
  "Instagram",
  "Facebook",
];

const initialForm = {
  company: "",
  owner: "",
  value: "",
  stage: "Qualified",
  source: "Website",
  priority: "Medium",
  startDate: "",
  notes: "",
};

const inputClass =
  "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

const selectClass =
  "h-14 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

const AddDealModal = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (open) {
      setFormData(initialData || initialForm);
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numeric value for deal amount
    if (name === "value") {
      const numeric = value.replace(/[^0-9]/g, "");

      setFormData({
        ...formData,
        value: numeric ? `$${Number(numeric).toLocaleString()}` : "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
      <div className="hide-scrollbar max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[40px] bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-100 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900">
                {initialData ? "Edit Deal" : "Create Deal"}
              </h2>

              <p className="mt-3 text-slate-500">
                Manage your sales pipeline professionally.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold transition hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 p-8">
          {/* Section */}
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Basic Information
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Company */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <Building2 size={16} />
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Adobe Inc."
                  required
                />
              </div>

              {/* Owner */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <User2 size={16} />
                  Owner
                </label>

                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Pranjal"
                  required
                />
              </div>

              {/* Value */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <CircleDollarSign size={16} />
                  Deal Value
                </label>

                <input
                  type="text"
                  name="value"
                  inputMode="numeric"
                  value={formData.value}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="$12,000"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <CalendarDays size={16} />
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pipeline */}
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Pipeline Details
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {/* Stage */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <Layers3 size={16} />
                  Stage
                </label>

                <select
                  name="stage"
                  value={formData.stage}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>

              {/* Source */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <FileText size={16} />
                  Source
                </label>

                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <Flag size={16} />
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <FileText size={16} />
              Notes
            </label>

            <textarea
              name="notes"
              rows={6}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add detailed notes..."
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-8">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl bg-slate-100 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
            >
              {initialData ? "Update Deal" : "Create Deal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealModal;
