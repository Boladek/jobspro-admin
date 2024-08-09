import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
// import profileAxios from "../helpers/profileAxios";
// import { useSelector } from "react-redux";
import adminAxios from "../helpers/adminAxios";

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
		data: dashboardStats = {},
		isLoading: gettingDashboardStats,
		refetch: refetchDashboardStats,
	} = useQuery({
		queryKey: ["dashboard-data"],
		queryFn: () => adminAxios.get("/dashboard/stats"),
		select: (data) => data.data,
		staleTime: Infinity,
	});

	const {
		data: growthStats = {},
		refetch: refetchGrowthStats,
		isLoading: gettingGrowthStats,
	} = useQuery({
		queryKey: ["dashboard-growth-stats"],
		queryFn: () => adminAxios.get("/dashboard/growth-check-stats"),
		staleTime: Infinity,
		select: (data) => data.data,
	});

	const {
		data: walletStats = {},
		refetch: refetchWalletStats,
		isLoading: gettingWalletStats,
	} = useQuery({
		queryKey: ["dashboard-wallet-stats"],
		queryFn: () => adminAxios.get("/dashboard/wallet-stats"),
		staleTime: Infinity,
		retry: 2,
		select: (data) => data.data,
	});

	const {
		data: dashboardLogs = {},
		refetch: refetchDashboardLogs,
		isLoading: gettingDashboardLogs,
	} = useQuery({
		queryKey: ["dashboard-log-stats"],
		queryFn: () => adminAxios.get("/dashboard/log-stats"),
		staleTime: Infinity,
		select: (data) => data.data,
	});

	const {
		data: jobsChart = [],
		refetch: refetchJobsStats,
		isLoading: gettingJobsStats,
	} = useQuery({
		queryKey: ["dashboard-jobs-chart"],
		queryFn: () => adminAxios.get("/dashboard/jobs-chart"),
		staleTime: Infinity,
		select: (data) => data.data,
	});

	// const {
	// 	data: accounts = {},
	// 	refetch: refetchWalletBalance,
	// 	isLoading: gettingWalletDetails,
	// } = useQuery({
	// 	queryKey: ["fetch-wallet-balance"],
	// 	queryFn: () => adminAxios.get("/transactions/get-virtual-accounts"),
	// 	staleTime: Infinity,
	// 	retry: 2,
	// 	select: (data) => data,
	// });

	const value = {
		dashboardStats,
		gettingDashboardStats,
		refetchDashboardStats,
		growthStats,
		refetchGrowthStats,
		gettingGrowthStats,
		walletStats,
		refetchWalletStats,
		gettingWalletStats,
		dashboardLogs,
		refetchDashboardLogs,
		gettingDashboardLogs,
		jobsChart,
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
