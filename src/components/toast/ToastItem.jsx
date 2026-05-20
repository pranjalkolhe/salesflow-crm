import { motion } from "framer-motion";

import { Bell, Briefcase, CheckCircle2, Users, X } from "lucide-react";

const icons = {
  deal: Briefcase,

  task: CheckCircle2,

  lead: Users,
};

const ToastItem = ({ toast, onClose }) => {
  const Icon = icons[toast.type] || Bell;

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: 120,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: 120,
        scale: 0.95,
      }}
      transition={{
        duration: 0.25,
      }}
      className="pointer-events-auto flex w-[380px] items-start gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl"
    >
      {/* Icon */}
      <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{toast.title}</h3>

        <p className="mt-1 text-sm text-slate-500">{toast.message}</p>
      </div>

      {/* Close */}
      <button
        onClick={onClose}
        className="rounded-xl p-1 transition hover:bg-slate-100"
      >
        <X size={16} className="text-slate-400" />
      </button>
    </motion.div>
  );
};

export default ToastItem;
