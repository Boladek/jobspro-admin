import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// Create AuthContext
const ModalContext = createContext();

// Create a custom hook to use the ModalContext
export const UseModal = () => {
	return useContext(ModalContext);
};

// Create ModalProvider component
export const ModalProvider = ({ children }) => {
	const [openWallet, setOpenWallet] = useState(false);

	const value = {
		openWallet,
		handleOpenWallet: () => setOpenWallet(true),
		handleCloseWallet: () => setOpenWallet(false),
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.node,
};
