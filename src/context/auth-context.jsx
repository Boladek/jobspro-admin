import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import profileAxios from "../helpers/profileAxios";
import { useSelector } from "react-redux";

// Create AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const UseAuth = () => {
	return useContext(AuthContext);
};

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
	const { user } = useSelector((state) => state.auth);
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["user-data"],
		queryFn: () => profileAxios.get("/auth/profile"),
		select: (data) => data,
		staleTime: Infinity,
	});

	const {
		data: accounts = {},
		refetch: refetchWalletBalance,
		isLoading: gettingWalletDetails,
	} = useQuery({
		queryKey: ["fetch-wallet-balance"],
		queryFn: () => profileAxios.get("/transactions/get-virtual-accounts"),
		staleTime: Infinity,
		retry: 2,
		select: (data) => data,
	});

	const value = {
		user: data ?? {},
		loading: isLoading,
		refetch,
		name:
			user?.userType !== "business"
				? `${user?.firstName} ${user?.lastName}`
				: user?.companyName,
		accounts,
		refetchWalletBalance,
		gettingWalletDetails,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};
