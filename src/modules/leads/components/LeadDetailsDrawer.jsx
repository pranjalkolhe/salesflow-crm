import { Building2, Mail, User2, X } from "lucide-react";

const LeadDetailsDrawer = ({ lead, open, onClose }) => {
  if (!lead) return null;

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-8 text-white">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl p-2 transition hover:bg-white/10"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-2xl font-bold">
            {lead.initials}
          </div>

          <div>
            <h2 className="text-3xl font-bold">{lead.name}</h2>

            <p className="mt-1 text-blue-100">{lead.company}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* Email */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Mail size={18} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Email Address</p>

              <h3 className="font-semibold text-slate-900">{lead.email}</h3>
            </div>
          </div>
        </div>

        {/* Company */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <Building2 size={18} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Company</p>

              <h3 className="font-semibold text-slate-900">{lead.company}</h3>
            </div>
          </div>
        </div>

        {/* Owner */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <User2 size={18} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Lead Owner</p>

              <h3 className="font-semibold text-slate-900">{lead.owner}</h3>
            </div>
          </div>
        </div>

        {/* Status + Value */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Status</p>

            <span className="mt-3 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {lead.status}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Deal Value</p>

            <h3 className="mt-3 text-2xl font-bold text-slate-900">
              {lead.value}
            </h3>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-700">Lead Notes</p>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            This lead is currently in the{" "}
            <span className="font-semibold text-slate-700">{lead.status}</span>{" "}
            stage. Follow-up activities and proposal discussions are in
            progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsDrawer;
