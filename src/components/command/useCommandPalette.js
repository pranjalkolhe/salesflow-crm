import { useEffect, useState } from "react";

const useCommandPalette = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      // Ctrl + K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
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
