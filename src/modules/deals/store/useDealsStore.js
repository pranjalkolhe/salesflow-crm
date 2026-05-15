import { create } from "zustand";

const initialDeals = [
  {
    id: 1,
    company: "Adobe",
    owner: "Pranjal",
    value: "$12,000",
    stage: "Qualified",
    source: "Website",
    priority: "High",
    closeDate: "12 May",
    notes: "Interested in enterprise CRM solution.",
  },

  {
    id: 2,
    company: "Spotify",
    owner: "Rahul",
    value: "$8,500",
    stage: "Proposal",
    source: "Referral",
    priority: "Medium",
    closeDate: "18 May",
    notes: "Proposal shared. Awaiting response.",
  },

  {
    id: 3,
    company: "Netflix",
    owner: "Aman",
    value: "$22,000",
    stage: "Negotiation",
    source: "Cold Email",
    priority: "High",
    closeDate: "22 May",
    notes: "Negotiation meeting scheduled.",
  },
];

const useDealsStore = create((set) => ({
  deals: initialDeals,

  addDeal: (deal) =>
    set((state) => ({
      deals: [
        {
          ...deal,
          id: Date.now(),
        },

        ...state.deals,
      ],
    })),

  deleteDeal: (id) =>
    set((state) => ({
      deals: state.deals.filter((deal) => deal.id !== id),
    })),

  updateDeal: (id, updatedData) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id
          ? {
              ...deal,
              ...updatedData,
            }
          : deal,
      ),
    })),

  moveDeal: (id, stage) =>
    set((state) => ({
      deals: state.deals.map((deal) =>
        deal.id === id
          ? {
              ...deal,
              stage,
            }
          : deal,
      ),
    })),
}));

export default useDealsStore;
