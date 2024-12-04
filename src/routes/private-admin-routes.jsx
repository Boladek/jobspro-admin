import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers/auth";
import { AdminDashboardProvider } from "../context/admin-dashboard-context";

export function PrivateAdminRoutes({ children }) {
  return (
    <AdminDashboardProvider>
      <div>{auth() ? children : <Navigate to="/" />}</div>
    </AdminDashboardProvider>
  );
}

PrivateAdminRoutes.propTypes = {
  children: PropTypes.node,
};
