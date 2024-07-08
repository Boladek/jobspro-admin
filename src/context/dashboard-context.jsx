import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import profileAxios from "../helpers/profileAxios";
import { useQuery } from "@tanstack/react-query";
import { UseAuth } from "./auth-context";

// Create AuthContext
const DashboardContext = createContext();

// Create a custom hook to use the DashboardContext
export const UseDashboard = () => {
	return useContext(DashboardContext);
};

// Create DashboardProvider component
export const DashboardProvider = ({ children }) => {
	const { user } = UseAuth();

	const {
		data: gigStatsBus = {},
		isLoading: gettingStats,
		refetch: refetchStatsBus,
	} = useQuery({
		queryKey: ["gig-stats-bus"],
		queryFn: () => profileAxios.get("/gigs/gig-stats"),
		select: (data) => data.data,
		staleTime: Infinity,
		enabled: !!user.userType && user.userType !== "pro",
	});

	const {
		data: gigStatsPro = {},
		isLoading: gettingProStats,
		refetch: refetchStatsPro,
	} = useQuery({
		queryKey: ["gig-stats-pro"],
		queryFn: () => profileAxios.get("/pro-gigs/gig-stats"),
		select: (data) => data.data,
		staleTime: Infinity,
		enabled: !!user.userType && user.userType === "pro",
	});

	const {
		data: dashboardStatsPro = {},
		isLoading: gettingProDashboardStats,
		refetch: refetchDashboardStatsPro,
	} = useQuery({
		queryKey: ["dashboard-stats-pro"],
		queryFn: () => profileAxios.get("/pro-gigs/dashboard-stats"),
		select: (data) => data.data,
		staleTime: Infinity,
		enabled: !!user.userType && user.userType === "pro",
	});

	const {
		data: dashboardStatsBus = {},
		isLoading: gettingBusDashboardStats,
		refetch: refetchDashboardStatsBus,
	} = useQuery({
		queryKey: ["dashboard-stats-bus"],
		queryFn: () => profileAxios.get("/gigs/dashboard-stats"),
		select: (data) => data.data,
		staleTime: Infinity,
		enabled: !!user.userType && user.userType !== "pro",
	});

	const value = {
		gigStats: user.userType === "pro" ? gigStatsPro : gigStatsBus,
		dashboardStats:
			user.userType === "pro" ? dashboardStatsPro : dashboardStatsBus,
		gettingStats: user.userType === "pro" ? gettingProStats : gettingStats,
		gettingDashbaordStats:
			user.userType === "pro"
				? gettingProDashboardStats
				: gettingBusDashboardStats,
		refetchStats: user.userType === "pro" ? refetchStatsPro : refetchStatsBus,
		refetchDashboardStats:
			user.userType === "pro"
				? refetchDashboardStatsPro
				: refetchDashboardStatsBus,
	};

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
};

DashboardProvider.propTypes = {
	children: PropTypes.node,
};
