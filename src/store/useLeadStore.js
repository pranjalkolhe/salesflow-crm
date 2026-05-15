import { create } from "zustand";

import { leads as initialLeads } from "@/modules/leads/data/leads.data";

const useLeadStore = create((set) => ({
  leads: initialLeads,

  // Add Lead
  addLead: (lead) =>
    set((state) => ({
      leads: [
        {
          id: Date.now(),
          ...lead,
        },

        ...state.leads,
      ],
    })),

  // Update Lead
  updateLead: (id, updatedLead) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              ...updatedLead,
            }
          : lead,
      ),
    })),

  // Delete Lead
  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id),
    })),
}));

export default useLeadStore;
