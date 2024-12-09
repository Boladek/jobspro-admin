import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Background } from "../component/background";
import NotFoundPage from "../pages/not-found-page";
import { AdminLayout } from "../component/admin/admin-layout";
import AdminLandingPage from "../pages/admin/admin-landing-page";
import AdminMessagesPage from "../pages/admin/admin-messages-page";
import AdminPushNotificationsPage from "../pages/admin/admin-push-notifications-page";
import AdminJobsPage from "../pages/admin/admin-jobs-page";
import AdminDisputesPage from "../pages/admin/admin-disputes-page";
import AdminUsersPage from "../pages/admin/admin-users-page";
import AdminUserDetailsPage from "../pages/admin/users/admin-user-details-page";
import { DashboardMainPage } from "../pages/admin/landing-page/main-page";
import { DashboardLogsPage } from "../pages/admin/landing-page/logs-page";
import { AdminUsersListPage } from "../pages/admin/users";
import { AdminUsersProvider } from "../context/admin-users-context";
import AdminLoginPage from "../pages/Registration/admin-login";
import { PrivateAdminRoutes } from "./private-admin-routes";
import { FinancialsPage } from "../pages/financials";
import { financialsRoutes } from "../pages/financials/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Background />,
    children: [
      {
        index: true,
        element: <AdminLoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "admin",
    element: (
      <PrivateAdminRoutes>
        <AdminLayout />
      </PrivateAdminRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminLandingPage />,
        children: [
          {
            index: true,
            element: <DashboardMainPage />,
          },
          {
            path: "logs",
            element: <DashboardLogsPage />,
          },
        ],
      },
      {
        path: "users",
        element: (
          <AdminUsersProvider>
            <AdminUsersPage />
          </AdminUsersProvider>
        ),
        children: [
          { index: true, element: <AdminUsersListPage /> },
          { path: ":userId", element: <AdminUserDetailsPage /> },
        ],
      },

      {
        path: "push-notifications",
        element: <AdminPushNotificationsPage />,
      },
      {
        path: "messages",
        element: <AdminMessagesPage />,
      },
      {
        path: "disputes",
        element: <AdminDisputesPage />,
      },
      {
        path: "jobs",
        element: <AdminJobsPage />,
      },
      {
        path: "financials",
        element: <FinancialsPage />,
        children: financialsRoutes,
      },
    ],
  },
]);

const BaseRoutes = () => <RouterProvider router={router} />;

export default BaseRoutes;
