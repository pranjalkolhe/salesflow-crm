import useLeadStore from "@/store/useLeadStore";

import useDealsStore from "@/modules/deals/store/useDealsStore";

import useTasksStore from "@/modules/tasks/store/useTasksStore";

const useCommandData = () => {
  const { leads } = useLeadStore();

  const { deals } = useDealsStore();

  const { tasks } = useTasksStore();

  // Navigation
  const navigation = [
    {
      id: "dashboard",
      type: "navigation",
      title: "Dashboard",
      description: "Go to dashboard overview",
      path: "/",
    },

    {
      id: "leads",
      type: "navigation",
      title: "Leads",
      description: "Manage CRM leads",
      path: "/leads",
    },

    {
      id: "deals",
      type: "navigation",
      title: "Deals",
      description: "Manage sales pipeline",
      path: "/deals",
    },

    {
      id: "tasks",
      type: "navigation",
      title: "Tasks",
      description: "Manage productivity tasks",
      path: "/tasks",
    },
  ];

  // Leads
  const searchableLeads = leads.map((lead) => ({
    id: lead.id,

    type: "leads",

    title: lead.name || lead.company,

    description: `${lead.company || "Lead"} • ${lead.status}`,

    path: "/leads",

    rawData: lead,
  }));

  // Deals
  const searchableDeals = deals.map((deal) => ({
    id: deal.id,

    type: "deals",

    title: deal.company,

    description: `${deal.stage} • ${deal.value}`,

    path: "/deals",

    rawData: deal,
  }));

  // Tasks
  const searchableTasks = tasks.map((task) => ({
    id: task.id,

    type: "tasks",

    title: task.title,

    description: `${task.status} • ${task.assignee}`,

    path: "/tasks",

    rawData: task,
  }));

  return [
    ...navigation,

    ...searchableLeads,

    ...searchableDeals,

    ...searchableTasks,
  ];
};

export default useCommandData;
