import useActivityStore from "@/store/useActivityStore";

const useActivityLogger = () => {
  const { addActivity } = useActivityStore();

  const logActivity = ({ type, title, user = "Pranjal" }) => {
    addActivity({
      type,

      title,

      user,

      time: "Just now",
    });
  };

  return {
    logActivity,
  };
};

export default useActivityLogger;
