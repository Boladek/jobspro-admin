import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import kycAxios from "../helpers/kycAxios";

// Create AuthContext
const KycContext = createContext();

// Create a custom hook to use the KycContext
export const UseKyc = () => {
	return useContext(KycContext);
};

// Create KycProvider component
export const KycProvider = ({ children }) => {
	const {
		data = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["kyc-status"],
		queryFn: () => kycAxios.get("/kyc/status"),
		select: (data) => data,
		retry: 2,
		staleTime: Infinity,
	});

	const value = {
		kyc: data ?? {},
		loading: isLoading,
		percentageComplete: data?.percentageComplete || 0,
		tier: data.tier || 0,
		refetch,
	};

	return <KycContext.Provider value={value}>{children}</KycContext.Provider>;
};

KycProvider.propTypes = {
	children: PropTypes.node,
};
