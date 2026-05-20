import useThemeStore from "@/store/useThemeStore";

const ToggleCard = ({ title, description, enabled, onChange }) => {
  return (
    <div className="flex items-center justify-between rounded-[28px] border border-slate-200 bg-slate-50 p-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {/* Toggle */}
      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <div
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled ? "left-8" : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

const AppearanceSettings = () => {
  const { darkMode, compactMode, toggleDarkMode, toggleCompactMode } =
    useThemeStore();

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900">Appearance</h1>

        <p className="mt-2 text-slate-500">
          Customize visual preferences and interface behavior.
        </p>
      </div>

      {/* Settings */}
      <div className="space-y-6">
        <ToggleCard
          title="Dark Mode"
          description="Enable dark theme across the CRM."
          enabled={darkMode}
          onChange={toggleDarkMode}
        />

        <ToggleCard
          title="Compact Mode"
          description="Reduce spacing and increase content density."
          enabled={compactMode}
          onChange={toggleCompactMode}
        />
      </div>
    </div>
  );
};

export default AppearanceSettings;
