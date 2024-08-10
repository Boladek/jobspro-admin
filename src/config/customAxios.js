import axios from "axios";
import { configKeys } from "../helpers/config";

const customAxios = axios.create({
	baseURL: configKeys.SSOURL,
	timeout: 50000,
});

const requestHandler = (request) => {
	request.headers.Authorization = localStorage.getItem("token");

	return request;
};

const responseHandler = (response) => {
	if (response.status === 403) {
		localStorage.clear();
		window.location = "/";
	}
	return response;
};

const errorHandler = (error) => {
	if (error.response.status === 403 || error.response.status === 401) {
		localStorage.clear();
		window.location = "/";
	}
	return Promise.reject(error);
};

customAxios.interceptors.request.use(
	(request) => requestHandler(request),
	(error) => errorHandler(error)
);

customAxios.interceptors.response.use(
	(response) => responseHandler(response),
	(error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;
