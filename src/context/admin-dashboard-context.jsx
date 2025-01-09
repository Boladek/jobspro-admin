import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import customAxios from "../config/customAxios";

// Create AdminDashBoardContext
const AdminDashBoardContext = createContext();

// Create a custom hook to use the AdminDashBoardContext
export const UseAdminDashboardContext = () => {
  return useContext(AdminDashBoardContext);
};

// Create AdminDashboardProvider component
export const AdminDashboardProvider = ({ children }) => {
  const {
    data: walletStats = {},
    refetch: refetchWalletStats,
    isLoading: gettingWalletStats,
  } = useQuery({
    queryKey: ["dashboard-wallet-stats"],
    queryFn: () => customAxios.get("/dashboard/wallet-stats"),
    staleTime: Infinity,
    retry: 2,
    select: (data) => data,
  });

  const value = {
    walletStats,
    refetchWalletStats,
    gettingWalletStats,
  };

  return (
    <AdminDashBoardContext.Provider value={value}>
      {children}
    </AdminDashBoardContext.Provider>
  );
};

AdminDashboardProvider.propTypes = {
  children: PropTypes.node,
};
