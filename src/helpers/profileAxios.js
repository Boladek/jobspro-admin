import axios from "axios";
import { toast } from "react-toastify";
import { configKeys } from "./config";
import StorageService from "./storage";

const profileAxios = axios.create({
	baseURL:
		"https://api.demo.jobspro.ai" ||
		"https://4cb5-102-89-33-5.ngrok-free.app" ||
		configKeys.baseURL,
	timeout: 50000,
});

const requestHandler = (request) => {
	// Token will be dynamic so we can use any app-specific way to always
	// fetch the new token before making the cal
	if (StorageService.getToken()) {
		request.headers.Authorization = `Bearer ${StorageService.getToken()}`;
	}
	request.headers["ngrok-skip-browser-warning"] = "69420";

	return request;
};

const responseHandler = (response) => {
	// if (response?.status === 403) {
	//   localStorage.clear();
	//   window.location = "/";
	// }
	return response.data;
};

const errorHandler = (error) => {
	// const message = error.response?.data?.message || error.response?.data?.msg || error.message;
	// // toast.error(message);
	if (error?.response?.status === 403 || error?.response?.status === 401) {
		if (window.location.pathname.includes("dashboard")) {
			toast.error("Session Expired");
			localStorage.clear();
			window.location = "/";
		}
	}
	return Promise.reject(error);
};

profileAxios.interceptors.request.use(
	(request) => requestHandler(request),
	(error) => errorHandler(error)
);

profileAxios.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default profileAxios;
