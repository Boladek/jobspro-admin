import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// Create AuthContext
const FinancialStatementContext = createContext();

// Create a custom hook to use the FinancialStatementContext
export const UseFinancialContext = () => {
	return useContext(FinancialStatementContext);
};

const tabs = ["monthly", "quarterly", "bi annually", "yearly"];

// Create FinancialStatementProvider component
export const FinancialStatementProvider = ({ children }) => {
	const [activeTab, setActiveTab] = useState(tabs[0]);

	const value = {
		activeTab,
		handleTab: (val) => setActiveTab(val),
		tabs,
	};

	return (
		<FinancialStatementContext.Provider value={value}>
			{children}
		</FinancialStatementContext.Provider>
	);
};

FinancialStatementProvider.propTypes = {
	children: PropTypes.node,
};
