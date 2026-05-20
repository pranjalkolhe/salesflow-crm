import {
  Bell,
  LockKeyhole,
  Monitor,
  Settings2,
  User2,
  BriefcaseBusiness,
} from "lucide-react";

const icons = {
  Profile: User2,

  Appearance: Monitor,

  Notifications: Bell,

  Workspace: BriefcaseBusiness,

  Security: LockKeyhole,
};

const SettingsSidebar = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="w-[300px] rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
          <Settings2 size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

          <p className="text-sm text-slate-500">Manage preferences</p>
        </div>
      </div>

      <div className="space-y-3">
        {tabs.map((tab) => {
          const Icon = icons[tab];

          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              <span className="font-semibold">{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsSidebar;
