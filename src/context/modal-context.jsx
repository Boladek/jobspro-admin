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
	const [openKyc, setOpenKyc] = useState(false);
	const [openEscrow, setOpenEscrow] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const [openFaq, setOpenFaq] = useState(false);
	const [openPassword, setOpenPassword] = useState(false);

	const value = {
		openWallet,
		handleOpenWallet: () => setOpenWallet(true),
		handleCloseWallet: () => setOpenWallet(false),
		openKyc,
		handleOpenKyc: () => setOpenKyc(true),
		handleCloseKyc: () => setOpenKyc(false),
		openEscrow,
		handleOpenEscrow: () => setOpenEscrow(true),
		handleCloseEscrow: () => setOpenEscrow(false),
		openProfile,
		handleOpenProfile: () => setOpenProfile(true),
		handleCloseProfile: () => setOpenProfile(false),
		openFaq,
		handleOpenFaq: () => setOpenFaq(true),
		handleCloseFaq: () => setOpenFaq(false),
		openPassword,
		handleOpenPassword: () => setOpenPassword(true),
		handleClosePassword: () => setOpenPassword(false),
	};

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.node,
};
