import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("pointerdown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
