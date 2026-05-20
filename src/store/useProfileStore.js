import { create } from "zustand";

const initialProfile = JSON.parse(localStorage.getItem("crm-profile")) || {
  name: "Pranjal Kolhe",

  email: "pranjal@example.com",

  role: "Sales Manager",

  avatar: "",
};

const useProfileStore = create((set) => ({
  profile: initialProfile,

  updateProfile: (data) => {
    const updated = {
      ...data,
    };

    localStorage.setItem("crm-profile", JSON.stringify(updated));

    set({
      profile: updated,
    });
  },

  updateAvatar: (avatar) => {
    set((state) => {
      const updated = {
        ...state.profile,
        avatar,
      };

      localStorage.setItem("crm-profile", JSON.stringify(updated));

      return {
        profile: updated,
      };
    });
  },
}));

export default useProfileStore;
