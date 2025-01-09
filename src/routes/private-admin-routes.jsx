import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers/auth";
import { AdminDashboardProvider } from "../context/admin-dashboard-context";
import { AuthProvider } from "../context/auth-context";

export function PrivateAdminRoutes({ children }) {
  const intervalRef = useRef(null);
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  useEffect(() => {
    function checkForInactivity() {
      const timer = Number(localStorage.getItem("timeout"));
      const currentTime = Date.now();
      if (currentTime > timer) {
        localStorage.clear();
        window.location = "/";
      }
    }

    intervalRef.current = setInterval(checkForInactivity, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    function updateTimer() {
      const futureTime = Date.now() + 30 * 60 * 1000; // 30 minutes
      localStorage.setItem("timeout", futureTime);
    }

    const events = ["resize", "click", "scroll", "mousemove"];
    events.forEach((event) => window.addEventListener(event, updateTimer));

    updateTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, updateTimer));
    };
  }, []);

  return (
    <div>
      {auth() ? (
        <AuthProvider>
          <AdminDashboardProvider>{children}</AdminDashboardProvider>
        </AuthProvider>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}

PrivateAdminRoutes.propTypes = {
  children: PropTypes.node,
};
