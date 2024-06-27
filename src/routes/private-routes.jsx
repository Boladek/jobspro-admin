import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers/auth";
import { AuthProvider } from "../context/auth-context";
import { KycProvider } from "../context/kyc-context";
import { ModalProvider } from "../context/wallet-context";

export function PrivateRoutes({ children }) {
	return (
		<AuthProvider>
			<KycProvider>
				<ModalProvider>
					<div>{auth() ? children : <Navigate to="/" />}</div>
				</ModalProvider>
			</KycProvider>
		</AuthProvider>
	);
}

PrivateRoutes.propTypes = {
	children: PropTypes.node,
};
