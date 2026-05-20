import { AnimatePresence, motion } from "framer-motion";

import { X } from "lucide-react";

import { useEffect, useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";

const Drawer = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-md",
}) => {
  const drawerRef = useRef(null);

  // Outside click
  useOutsideClick(drawerRef, () => {
    if (open) {
      onClose();
    }
  });

  // ESC close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 260,
            }}
            className={`fixed right-0 top-0 z-50 h-screen w-full ${width} border-l border-slate-200 bg-white shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{title}</h2>

                {subtitle && (
                  <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="rounded-2xl p-2 transition hover:bg-slate-100"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="hide-scrollbar h-[calc(100vh-110px)] overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
