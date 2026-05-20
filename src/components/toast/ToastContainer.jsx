import { AnimatePresence } from "framer-motion";

import ToastItem from "./ToastItem";

import useToastStore from "@/store/useToastStore";

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="pointer-events-none fixed right-6 top-6 z-[9999] flex flex-col gap-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
