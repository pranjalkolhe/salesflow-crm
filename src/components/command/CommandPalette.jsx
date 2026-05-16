import {
  Briefcase,
  CheckSquare,
  LayoutDashboard,
  Search,
  Users,
} from "lucide-react";

import { Command, CommandEmpty, CommandInput, CommandList } from "cmdk";

import { useNavigate } from "react-router-dom";

import CommandItem from "./CommandItem";

import useCommandPalette from "./useCommandPalette";

const CommandPalette = () => {
  const navigate = useNavigate();

  const { open, setOpen } = useCommandPalette();

  const routes = [
    {
      title: "Dashboard",
      description: "Go to dashboard overview",
      icon: <LayoutDashboard size={20} />,
      path: "/",
    },

    {
      title: "Leads",
      description: "Manage CRM leads",
      icon: <Users size={20} />,
      path: "/leads",
    },

    {
      title: "Deals",
      description: "Manage sales pipeline",
      icon: <Briefcase size={20} />,
      path: "/deals",
    },

    {
      title: "Tasks",
      description: "Manage productivity tasks",
      icon: <CheckSquare size={20} />,
      path: "/tasks",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 p-6 pt-24 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        <Command className="w-full">
          {/* Search */}
          <div className="flex items-center border-b border-slate-100 px-5">
            <Search size={20} className="text-slate-400" />

            <CommandInput
              placeholder="Search CRM..."
              className="h-16 flex-1 bg-transparent px-4 text-base outline-none"
            />
          </div>

          {/* List */}
          <CommandList className="max-h-[500px] overflow-y-auto p-4">
            <CommandEmpty className="py-10 text-center text-sm text-slate-400">
              No results found.
            </CommandEmpty>

            {routes.map((item) => (
              <CommandItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                onSelect={() => {
                  navigate(item.path);

                  setOpen(false);
                }}
              />
            ))}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
