import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BaseRoutes from "./routes/base-routes";
import { configKeys } from "./helpers/config";
import store from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import StorageService from "./helpers/storage";
import { auth } from "./helpers/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";

console.log({ configKeys });

const queryClient = new QueryClient();

if (auth()) {
	const user = StorageService.getUser();
	store.dispatch(loginSuccess(user));
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GoogleOAuthProvider clientId={configKeys.googleId}>
				<ToastContainer />
				<BaseRoutes />
			</GoogleOAuthProvider>
			{/* <ChatProvider>
			</ChatProvider> */}
		</QueryClientProvider>
	);
}
