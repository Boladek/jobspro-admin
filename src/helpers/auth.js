import StorageService from "./storage";

export function auth() {
	const user = StorageService.getUser();
	const token = StorageService.getToken();
	return user && token ? true : false;
}
