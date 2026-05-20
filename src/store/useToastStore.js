import { create } from "zustand";

const useToastStore = create((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Date.now();

    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          ...toast,
        },
      ],
    }));

    // Auto remove
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3500);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export default useToastStore;
