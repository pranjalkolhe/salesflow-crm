import { Search } from "lucide-react";

import { useMemo, useState } from "react";
import { useRef } from "react";

import useOutsideClick from "@/hooks/useOutsideClick";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";

import { useNavigate } from "react-router-dom";

import useCommandPalette from "./useCommandPalette";

import useCommandData from "./data/useCommandData";

import { commandSections } from "./data/commandSections";

const CommandPalette = () => {
  const navigate = useNavigate();

  const { open, setOpen } = useCommandPalette();
  const [search, setSearch] = useState("");

  const commandData = useCommandData();
  const filteredData = useMemo(() => {
    if (!search) return commandData;

    const lowerSearch = search.toLowerCase();
    const paletteRef = useRef(null);

    useOutsideClick(paletteRef, () => setOpen(false));

    return [...commandData].sort((a, b) => {
      const aTitle = a.title.toLowerCase();

      const bTitle = b.title.toLowerCase();

      // Exact title match
      if (aTitle === lowerSearch) return -1;

      if (bTitle === lowerSearch) return 1;

      // Starts with search
      if (aTitle.startsWith(lowerSearch)) return -1;

      if (bTitle.startsWith(lowerSearch)) return 1;

      // Includes search
      if (aTitle.includes(lowerSearch)) return -1;

      if (bTitle.includes(lowerSearch)) return 1;

      return 0;
    });
  }, [search, commandData]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 p-6 pt-24 backdrop-blur-sm">
      <div
        ref={paletteRef}
        className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl"
      >
        <Command shouldFilter className="w-full">
          {/* Search */}
          <div className="flex items-center border-b border-slate-100 px-5">
            <Search size={20} className="text-slate-400" />

            <CommandInput
              autoFocus
              value={search}
              onValueChange={setSearch}
              placeholder="Search CRM..."
              className="h-16 flex-1 bg-transparent px-4 text-base outline-none"
            />
          </div>

          {/* Results */}
          <CommandList className="max-h-[550px] overflow-y-auto p-4">
            <CommandEmpty className="py-10 text-center text-sm text-slate-400">
              No results found.
            </CommandEmpty>
          </CommandList>
          {filteredData.map((item) => {
            const section = commandSections[item.type];

            const Icon = section.icon;

            return (
              <CommandItem
                key={`${item.type}-${item.id}`}
                value={`${item.title} ${item.description}`}
                onSelect={() => {
                  navigate(item.path);

                  setOpen(false);
                }}
                className="mb-2 flex cursor-pointer items-start gap-4 rounded-2xl px-4 py-4 transition data-[selected=true]:bg-slate-100"
              >
                {/* Icon */}
                <div className="mt-1 rounded-xl bg-slate-100 p-3 text-slate-700">
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {section.label}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </CommandItem>
            );
          })}
        </Command>
      </div>
    </div>
  );
};

export default CommandPalette;
