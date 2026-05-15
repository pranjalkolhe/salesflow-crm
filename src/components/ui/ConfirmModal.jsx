const ConfirmModal = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default",
  onConfirm,
  onClose,
}) => {
  if (!open) return null;

  const buttonColors = {
    default: "from-blue-600 to-indigo-600",

    danger: "from-rose-500 to-red-600",

    success: "from-emerald-500 to-green-600",
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>

        {/* Message */}
        <p className="mt-4 leading-7 text-slate-500">{message}</p>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();

              onClose();
            }}
            className={`rounded-2xl bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] ${
              buttonColors[type]
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
