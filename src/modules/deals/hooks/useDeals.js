import useDealsStore from "../store/useDealsStore";

const stages = ["Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const useDeals = () => {
  const { deals, addDeal, deleteDeal, updateDeal, moveDeal } = useDealsStore();

  const groupedDeals = stages.map((stage) => ({
    stage,

    deals: deals.filter((deal) => deal.stage === stage),
  }));

  const totalValue = deals.reduce((acc, deal) => {
    const value = Number(deal.value.replace(/[^0-9]/g, ""));

    return acc + value;
  }, 0);

  const wonDeals = deals.filter((deal) => deal.stage === "Won").length;

  return {
    deals,
    groupedDeals,

    totalDeals: deals.length,
    totalValue,
    wonDeals,

    addDeal,
    deleteDeal,
    updateDeal,
    moveDeal,
  };
};

export default useDeals;
