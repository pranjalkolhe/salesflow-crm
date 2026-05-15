import { createBrowserRouter } from "react-router-dom";
import DealsPage from "@/modules/deals/pages/DealsPage";
import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/modules/dashboard/pages/DashboardPage";

import LeadsPage from "@/modules/leads/pages/LeadsPage";

const router = createBrowserRouter([
  {
    path: "/",

    element: <MainLayout />,

    children: [
      {
        index: true,

        element: <DashboardPage />,
      },

      {
        path: "leads",

        element: <LeadsPage />,
      },
      {
        path: "deals",
        element: <DealsPage />,
      },
    ],
  },
]);

export default router;
