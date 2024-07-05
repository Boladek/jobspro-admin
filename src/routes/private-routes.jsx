import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers/auth";
import { AuthProvider } from "../context/auth-context";
import { KycProvider } from "../context/kyc-context";
import { ModalProvider } from "../context/modal-context";
import { DashboardProvider } from "../context/dashboard-context";
export function PrivateRoutes({ children }) {
	return (
		<AuthProvider>
			<KycProvider>
				<DashboardProvider>
					<ModalProvider>
						<div>{auth() ? children : <Navigate to="/" />}</div>
					</ModalProvider>
				</DashboardProvider>
			</KycProvider>
		</AuthProvider>
	);
}

PrivateRoutes.propTypes = {
	children: PropTypes.node,
};
