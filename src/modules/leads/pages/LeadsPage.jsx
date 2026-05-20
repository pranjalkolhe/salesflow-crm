import { useState } from "react";
import useToastStore from "@/store/useToastStore";
import AddLeadModal from "../components/AddLeadModal";
import LeadsHeader from "../components/LeadsHeader";
import LeadsStats from "../components/LeadsStats";
import LeadsTable from "../components/LeadsTable";
import FilterDropdown from "@/components/ui/FilterDropdown";
import Input from "@/components/ui/Input";
import { Search } from "lucide-react";

import useLeads from "../hooks/useLeads";

const LeadsPage = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const { addToast } = useToastStore();

  const {
    search,
    setSearch,

    status,
    setStatus,

    sort,
    setSort,

    source,
    setSource,

    leads,

    totalLeads,
  } = useLeads();

  // Stats
  const wonDeals = leads.filter((lead) => lead.status === "Won").length;

  const lostDeals = leads.filter((lead) => lead.status === "Lost").length;

  const revenue = leads
    .filter((lead) => lead.status === "Won")
    .reduce((acc, lead) => {
      const value = Number(lead.value.replace(/[^0-9]/g, ""));

      return acc + value;
    }, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <LeadsHeader onAddLead={() => setOpenAddModal(true)} />

      {/* Stats */}
      <LeadsStats
        totalLeads={totalLeads}
        wonDeals={wonDeals}
        lostDeals={lostDeals}
        revenue={`$${revenue.toLocaleString()}`}
      />

      {/* Table */}

      <LeadsTable
        leads={leads}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
        sort={sort}
        setSort={setSort}
      />

      {/* Add Modal */}
      <AddLeadModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </div>
  );
};

export default LeadsPage;
