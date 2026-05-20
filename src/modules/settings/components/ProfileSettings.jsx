import { useEffect, useState } from "react";

import useProfileStore from "@/store/useProfileStore";

import useToastStore from "@/store/useToastStore";

const ProfileSettings = () => {
  const { profile, updateProfile, updateAvatar } = useProfileStore();

  const { addToast } = useToastStore();

  const [formData, setFormData] = useState(profile);

  // Sync whenever profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      addToast({
        type: "lead",

        title: "Invalid file",

        message: "Please upload an image file.",
      });

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const avatar = reader.result;

      // Update global avatar
      updateAvatar(avatar);

      addToast({
        type: "lead",

        title: "Profile photo updated",

        message: "Your avatar has been updated.",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateProfile(formData);

    addToast({
      type: "lead",

      title: "Profile updated",

      message: "Your profile changes have been saved.",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">Profile</h1>

        <p className="mt-2 text-slate-500">
          Update your account information and avatar.
        </p>
      </div>

      {/* Avatar */}
      <div className="mb-10 flex items-center gap-6">
        {profile.avatar ? (
          <img
            src={profile.avatar}
            alt="avatar"
            className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-100"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-3xl font-bold text-white">
            {profile.name?.charAt(0)}
          </div>
        )}

        <div>
          <label className="cursor-pointer rounded-2xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="hidden"
            />
          </label>

          <p className="mt-2 text-sm text-slate-500">JPG, PNG up to 5MB</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Role
          </label>

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;
