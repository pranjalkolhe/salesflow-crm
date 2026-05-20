import { useState } from "react";

import SettingsSidebar from "../components/SettingsSidebar";

import ProfileSettings from "../components/ProfileSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import WorkspaceSettings from "../components/WorkspaceSettings";
import SecuritySettings from "../components/SecuritySettings";

const tabs = [
  "Profile",
  "Appearance",
  "Notifications",
  "Workspace",
  "Security",
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileSettings />;

      case "Appearance":
        return <AppearanceSettings />;

      case "Notifications":
        return <NotificationSettings />;

      case "Workspace":
        return <WorkspaceSettings />;

      case "Security":
        return <SecuritySettings />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full gap-8 overflow-hidden">
      {/* Sidebar */}
      <SettingsSidebar
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      <div className="hide-scrollbar flex-1 overflow-y-auto rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
