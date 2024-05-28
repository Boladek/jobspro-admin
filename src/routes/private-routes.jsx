import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers/auth";
import { AuthProvider } from "../context/auth-context";

export function PrivateRoutes({ children }) {
	return (
		<AuthProvider>
			<div>{auth() ? children : <Navigate to="/" />}</div>
		</AuthProvider>
	);
}

PrivateRoutes.propTypes = {
	children: PropTypes.node,
};
