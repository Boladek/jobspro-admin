import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import kycAxios from "../helpers/kycAxios";

// Create AuthContext
const WalletContext = createContext();

// Create a custom hook to use the WalletContext
export const UseWallet = () => {
	return useContext(WalletContext);
};

// Create WalletProvider component
export const WalletProvider = ({ children }) => {
	const [openWallet, setOpenWallet] = useState(false);
	// const {
	// 	data = {},
	// 	isLoading,
	// 	refetch,
	// } = useQuery({
	// 	queryKey: ["kyc-status"],
	// 	queryFn: () => kycAxios.get("/kyc/status"),
	// 	select: (data) => data,
	// 	retry: 2,
	// 	staleTime: Infinity,
	// });

	const value = {
		// kyc: data ?? {},
		// loading: isLoading,
		// percentageComplete: data?.percentageComplete || 0,
		// tier: data.tier || 0,
		// refetch,
		openWallet,
		handleOpenWallet: () => setOpenWallet(true),
		handleCloseWallet: () => setOpenWallet(false),
	};

	return (
		<WalletContext.Provider value={value}>{children}</WalletContext.Provider>
	);
};

WalletProvider.propTypes = {
	children: PropTypes.node,
};
