import { useState } from "react";
import CommandPalette from "@/components/command/CommandPalette";
import NotificationBell from "@/components/notifications/NotificationBell";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";

import sidebarLinks from "./sidebar.data";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#081028] text-white transition-all duration-300 ${
          collapsed ? "w-24" : "w-72"
        }`}
      >
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-10 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:scale-105 hover:bg-slate-100"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Logo */}
        <div
          className={`border-b border-white/10 ${
            collapsed ? "px-0 py-6" : "px-6 py-8"
          }`}
        >
          {collapsed ? (
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black">
                C
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-5xl font-black tracking-tight">
                CRM
                <span className="text-blue-500">SaaS</span>
              </h1>

              <p className="mt-2 text-sm text-slate-400">Sales Platform</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-3 px-4 py-6">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={() => setCollapsed(true)}
                className={({ isActive }) =>
                  `group flex items-center rounded-2xl transition-all duration-200 ${
                    collapsed ? "justify-center px-0 py-4" : "gap-4 px-5 py-4"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={22}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                {!collapsed && (
                  <span className="text-sm font-semibold">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="border-t border-white/10 p-4">
          <div
            className={`flex items-center rounded-3xl bg-white/5 p-4 ${
              collapsed ? "justify-center" : "gap-4"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold">
              PK
            </div>

            {!collapsed && (
              <div>
                <h3 className="font-semibold text-white">Pranjal</h3>

                <p className="text-sm text-slate-400">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div
        className={`flex h-screen flex-1 flex-col overflow-hidden transition-all duration-300 ${
          collapsed ? "ml-24" : "ml-72"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-5">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search leads, deals..."
                onFocus={() => setCollapsed(true)}
                className="h-14 w-80 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <NotificationBell />

              <button className="rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-md">
                <Settings size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
};

export default MainLayout;
