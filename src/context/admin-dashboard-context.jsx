import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
// import profileAxios from "../helpers/profileAxios";
// import { useSelector } from "react-redux";
import customAxios from "../config/customAxios";

// Create AdminDashBoardContext
const AdminDashBoardContext = createContext();

// Create a custom hook to use the AdminDashBoardContext
export const UseAdminDashboardContext = () => {
  return useContext(AdminDashBoardContext);
};

// Create AdminDashboardProvider component
export const AdminDashboardProvider = ({ children }) => {
  // const { user } = useSelector((state) => state.auth);

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

  // const {
  // 	data: accounts = {},
  // 	refetch: refetchWalletBalance,
  // 	isLoading: gettingWalletDetails,
  // } = useQuery({
  // 	queryKey: ["fetch-wallet-balance"],
  // 	queryFn: () => customAxios.get("/transactions/get-virtual-accounts"),
  // 	staleTime: Infinity,
  // 	retry: 2,
  // 	select: (data) => data,
  // });

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
