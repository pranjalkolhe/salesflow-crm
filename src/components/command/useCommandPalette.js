import { useEffect, useState } from "react";

const useCommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      const target = e.target;

      const isInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable;

      // Ignore shortcuts while typing
      if (isInput) return;

      // Ctrl + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();

        setOpen((open) => !open);
      }

      // ESC close
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return {
    open,
    setOpen,
  };
};

export default useCommandPalette;
