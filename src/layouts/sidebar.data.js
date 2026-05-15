import {
  BarChart3,
  CheckSquare,
  LayoutDashboard,
  Settings,
  Users,
  Briefcase,
} from "lucide-react";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },

  {
    label: "Leads",
    href: "/leads",
    icon: Users,
  },

  {
    label: "Deals",
    href: "/deals",
    icon: Briefcase,
  },

  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },

  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default sidebarLinks;
