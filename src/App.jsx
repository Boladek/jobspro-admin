import { ToastContainer } from "react-toastify";
import BaseRoutes from "./routes/base-routes";
import store from "./store";
import { loginSuccess } from "./store/slices/authSlice";
import StorageService from "./helpers/storage";
import { auth } from "./helpers/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { configKeys } from "./helpers/config";

console.log({ configKeys });

const queryClient = new QueryClient();

if (auth()) {
    const user = StorageService.getUser();
    store.dispatch(loginSuccess(user));
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <BaseRoutes />
        </QueryClientProvider>
    );
}
