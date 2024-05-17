import { createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "../../helpers/function";
import StorageService from "../../helpers/storage";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isProcessing: false,
		user: null,
		isAuthenticated: false,
	},
	reducers: {
		logout(state) {
			state.isProcessing = false;
			state.isAuthenticated = false;
			state.user = null;
			window.location = "/";
			StorageService.clearStorage();
		},
		loginSuccess(state, action) {
			state.isAuthenticated = !isEmpty(action.payload);
			state.user = action.payload;
			state.message = "";
			state.error = "";
		},
	},
});

export const { logout, loginSuccess } = authSlice.actions;

export default authSlice.reducer;
