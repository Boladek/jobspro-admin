import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseRoutes from "./routes/base-routes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { configKeys } from "./helpers/config";
import store from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import StorageService from "./helpers/storage";
import { auth } from "./helpers/auth";

if (auth()) {
	const user = StorageService.getUser();
	store.dispatch(loginSuccess(JSON.parse(user)));
}

export default function App() {
	return (
		<GoogleOAuthProvider clientId={configKeys.googleId}>
			<ToastContainer />
			<BaseRoutes />
		</GoogleOAuthProvider>
	);
}
