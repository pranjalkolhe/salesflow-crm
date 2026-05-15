import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FilterDropdown from "@/components/ui/FilterDropdown";
import Input from "@/components/ui/Input";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import AddLeadModal from "./AddLeadModal";
import LeadDetailsDrawer from "./LeadDetailsDrawer";
import useLeadStore from "@/store/useLeadStore";

const statusColors = {
  Qualified: "bg-blue-100 text-blue-700",

  Proposal: "bg-amber-100 text-amber-700",

  Negotiation: "bg-purple-100 text-purple-700",

  Won: "bg-emerald-100 text-emerald-700",

  Lost: "bg-rose-100 text-rose-700",
};

const LeadsTable = ({
  leads,

  search,
  setSearch,

  status,
  setStatus,

  source,
  setSource,

  sort,
  setSort,
}) => {
  const { deleteLead } = useLeadStore();

  const [selectedLead, setSelectedLead] = useState(null);

  const [editLead, setEditLead] = useState(null);

  const [deleteLeadData, setDeleteLeadData] = useState(null);

  const [activeMenu, setActiveMenu] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto overflow-y-visible">
          {/* Filters */}
          <div className="rounded-t-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-5">
              {/* Search */}
              <div className="xl:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-500">
                  Search Leads
                </label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name..."
                    className="pl-11"
                  />
                </div>
              </div>

              {/* Status */}
              <FilterDropdown
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                  "All",
                  "Qualified",
                  "Proposal",
                  "Negotiation",
                  "Won",
                  "Lost",
                ]}
              />

              {/* Source */}
              <FilterDropdown
                label="Source"
                value={source}
                onChange={setSource}
                options={["All", "Website", "Referral", "Cold Email", "Event"]}
              />

              {/* Sort */}
              <FilterDropdown
                label="Sort"
                value={sort}
                onChange={setSort}
                options={["Newest", "Oldest"]}
              />
            </div>
          </div>
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                  Lead
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                  Source
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                  Deal Value
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-500">
                  Owner
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Lead */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                        {lead.initials}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {lead.name}
                        </h3>

                        <p className="text-sm text-slate-500">{lead.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-5 font-medium text-slate-700">
                    {lead.company}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-5 text-slate-600">{lead.source}</td>

                  {/* Deal Value */}
                  <td className="px-6 py-5 font-semibold text-slate-900">
                    {lead.value}
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-5 text-slate-600">{lead.owner}</td>

                  {/* Actions */}
                  <td className="relative px-6 py-5 text-right">
                    <button
                      onClick={() =>
                        setActiveMenu(activeMenu === lead.id ? null : lead.id)
                      }
                      className="rounded-xl p-2 transition hover:bg-slate-100"
                    >
                      <MoreVertical size={18} className="text-slate-500" />
                    </button>

                    {activeMenu === lead.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-6 top-14 z-50 w-[200px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                      >
                        {/* View */}
                        <button
                          onClick={() => {
                            setSelectedLead(lead);

                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <Eye size={16} />
                          View Details
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => {
                            setEditLead(lead);

                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <Pencil size={16} />
                          Edit Lead
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            setDeleteLeadData(lead);

                            setActiveMenu(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                        >
                          <Trash2 size={16} />
                          Delete Lead
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <LeadDetailsDrawer
        lead={selectedLead}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />

      {/* Edit Modal */}
      <AddLeadModal
        open={!!editLead}
        editLead={editLead}
        onClose={() => setEditLead(null)}
      />

      {/* Delete Modal */}
      <Modal
        open={!!deleteLeadData}
        onClose={() => setDeleteLeadData(null)}
        title="Delete Lead"
      >
        <div className="space-y-6">
          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">
              {deleteLeadData?.name}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteLeadData(null)}>
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                deleteLead(deleteLeadData.id);

                setDeleteLeadData(null);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LeadsTable;
