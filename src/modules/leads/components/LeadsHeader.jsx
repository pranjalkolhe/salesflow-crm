import { Plus, Search } from "lucide-react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import FilterDropdown from "../../../components/ui/FilterDropdown";

const LeadsHeader = ({
  search,
  setSearch,

  status,
  setStatus,

  sort,
  setSort,

  source,
  setSource,

  onAddLead,
}) => {
  return (
    <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* Top */}
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Leads Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and track your sales leads efficiently.
          </p>
        </div>

        <Button onClick={onAddLead} className="gap-2">
          <Plus size={18} />
          Add Lead
        </Button>
      </div>
    </div>
  );
};

export default LeadsHeader;
