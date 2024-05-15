import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseRoutes from "./routes/base-routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
	return (
		<GoogleOAuthProvider clientId="568708133732-3uivs8429tig4nel8hgtq3q9m9b39hd3.apps.googleusercontent.com">
			<ToastContainer />
			<BaseRoutes />
		</GoogleOAuthProvider>
	);
}
