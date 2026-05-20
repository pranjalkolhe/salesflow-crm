import { create } from "zustand";

const getInitialTheme = () => {
  const saved = localStorage.getItem("crm-theme");

  return saved
    ? JSON.parse(saved)
    : {
        darkMode: false,
        compactMode: false,
      };
};

const initialTheme = getInitialTheme();

const useThemeStore = create((set) => ({
  darkMode: initialTheme.darkMode,

  compactMode: initialTheme.compactMode,

  toggleDarkMode: () =>
    set((state) => {
      const updated = {
        darkMode: !state.darkMode,

        compactMode: state.compactMode,
      };

      localStorage.setItem("crm-theme", JSON.stringify(updated));

      return updated;
    }),

  toggleCompactMode: () =>
    set((state) => {
      const updated = {
        darkMode: state.darkMode,

        compactMode: !state.compactMode,
      };

      localStorage.setItem("crm-theme", JSON.stringify(updated));

      return updated;
    }),
}));

export default useThemeStore;
