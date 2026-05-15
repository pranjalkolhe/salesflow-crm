import useLeadStore from "@/store/useLeadStore";

const useDashboard = () => {
  const { leads } = useLeadStore();

  const totalLeads = leads.length;

  const wonDeals = leads.filter((lead) => lead.status === "Won").length;

  const lostDeals = leads.filter((lead) => lead.status === "Lost").length;

  const proposalDeals = leads.filter(
    (lead) => lead.status === "Proposal",
  ).length;

  const qualifiedDeals = leads.filter(
    (lead) => lead.status === "Qualified",
  ).length;

  const negotiationDeals = leads.filter(
    (lead) => lead.status === "Negotiation",
  ).length;

  const totalRevenue = leads
    .filter((lead) => lead.status === "Won")
    .reduce((acc, lead) => {
      const value = Number(lead.value.replace(/[^0-9]/g, ""));

      return acc + value;
    }, 0);

  const conversionRate =
    totalLeads > 0 ? ((wonDeals / totalLeads) * 100).toFixed(1) : 0;

  const chartData = [
    {
      name: "Qualified",
      value: qualifiedDeals,
    },
    {
      name: "Proposal",
      value: proposalDeals,
    },
    {
      name: "Negotiation",
      value: negotiationDeals,
    },
    {
      name: "Won",
      value: wonDeals,
    },
    {
      name: "Lost",
      value: lostDeals,
    },
  ];

  return {
    totalLeads,
    wonDeals,
    lostDeals,
    totalRevenue,
    conversionRate,
    chartData,
    recentLeads: leads.slice(0, 5),
  };
};

export default useDashboard;
