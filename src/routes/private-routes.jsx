import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { auth } from "../helpers/auth";

export function PrivateRoutes({ children }) {
	return <div>{auth() ? children : <Navigate to="/" />}</div>;
}

PrivateRoutes.propTypes = {
	children: PropTypes.node,
};
