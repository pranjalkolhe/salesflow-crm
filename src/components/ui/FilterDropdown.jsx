import { Listbox, Transition } from "@headlessui/react";

import { Check, ChevronDown } from "lucide-react";

import { Fragment } from "react";

const FilterDropdown = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-500">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button className="relative h-11 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 text-left shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100">
            <span className="block truncate text-sm font-medium text-slate-700">
              {value}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
              <ChevronDown size={18} className="text-slate-400" />
            </span>
          </Listbox.Button>

          {/* Dropdown */}
          <Transition
            as={Fragment}
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute  z-[9999] mt-3 max-h-72 w-full overflow-auto rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none px-5 py-3 text-sm font-medium transition ${
                      active ? "bg-blue-50 text-blue-700" : "text-slate-700"
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="flex items-center justify-between">
                      <span className={selected ? "font-semibold" : ""}>
                        {option}
                      </span>

                      {selected && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FilterDropdown;
