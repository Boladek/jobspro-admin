import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import profileAxios from "../helpers/profileAxios";

// Create AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const UseAuth = () => {
	return useContext(AuthContext);
};

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["user-data"],
		queryFn: () => profileAxios.get("/auth/profile"),
		select: (data) => data,
		staleTime: Infinity,
	});

	const value = {
		user: data ?? {},
		loading: isLoading,
		refetch,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};
