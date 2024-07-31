import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// Create AuthContext
const CommissionContext = createContext();

// Create a custom hook to use the CommissionContext
export const UseCommission = () => {
	return useContext(CommissionContext);
};

// Create KycProvider component
export const CommissionProvider = ({ children }) => {
	const [step, setStep] = useState(1);
	const value = {
		step: step,
		handleStep: (val) => setStep(val),
	};

	return (
		<CommissionContext.Provider value={value}>
			{children}
		</CommissionContext.Provider>
	);
};

CommissionProvider.propTypes = {
	children: PropTypes.node,
};
