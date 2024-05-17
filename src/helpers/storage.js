import secureLocalStorage from "react-secure-storage";

class StorageService {
	setToken(token) {
		secureLocalStorage.setItem("token", token);
	}

	setUser(user) {
		secureLocalStorage.setItem("user", JSON.stringify(user));
	}

	getToken() {
		const token = secureLocalStorage.getItem("token");
		return token;
	}

	getUser() {
		const user = JSON.parse(secureLocalStorage.getItem("user"));
		return user;
	}

	removeToken() {
		secureLocalStorage.removeItem("token");
	}

	removeUser() {
		secureLocalStorage.removeItem("user");
	}

	clearStorage() {
		secureLocalStorage.clear();
	}
}

export default new StorageService();
