import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { MsalProvider } from "@azure/msal-react";
// import { PublicClientApplication } from "@azure/msal-browser";
import "react-toastify/dist/ReactToastify.css";
import BaseRoutes from "./routes/base-routes";
import { configKeys } from "./helpers/config";
import store from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import StorageService from "./helpers/storage";
import { auth } from "./helpers/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./context/chat-context";

const queryClient = new QueryClient();

if (auth()) {
	const user = StorageService.getUser();
	store.dispatch(loginSuccess(user));
}

// const configuration = {
// 	auth: {
// 		clientId: configKeys.microsoftID,
// 	},
// };

// const pca = new PublicClientApplication(configuration);

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ChatProvider>
				<GoogleOAuthProvider clientId={configKeys.googleId}>
					<ToastContainer />
					<BaseRoutes />
				</GoogleOAuthProvider>
			</ChatProvider>
			{/* <MsalProvider instance={pca}>
			</MsalProvider> */}
		</QueryClientProvider>
	);
}
