import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import "react-toastify/dist/ReactToastify.css";
import BaseRoutes from "./routes/base-routes";
import { configKeys } from "./helpers/config";
import store from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import StorageService from "./helpers/storage";
import { auth } from "./helpers/auth";

if (auth()) {
	const user = StorageService.getUser();
	console.log({ user });
	store.dispatch(loginSuccess(user));
}

const configuration = {
	auth: {
		clientId: configKeys.microsoftID,
	},
};

const pca = new PublicClientApplication(configuration);

export default function App() {
	return (
		<MsalProvider instance={pca}>
			<GoogleOAuthProvider clientId={configKeys.googleId}>
				<ToastContainer />
				<BaseRoutes />
			</GoogleOAuthProvider>
		</MsalProvider>
	);
}
