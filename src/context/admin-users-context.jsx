import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// Create AuthContext
const AdminUsersContext = createContext();

// Create a custom hook to use the AdminUsersContext
export const UseAdminUsersContext = () => {
	return useContext(AdminUsersContext);
};

const tabs = ["pro", "business", "staff"];

// Create AdminUsersProvider component
export const AdminUsersProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState(tabs[0]);

	const value = {
		activeTab,
		handleTab: (val) => setActiveTab(val),
		tabs,
	};

	return (
		<AdminUsersContext.Provider value={value}>
			{children}
		</AdminUsersContext.Provider>
	);
};

AdminUsersProvider.propTypes = {
	children: PropTypes.node,
};
