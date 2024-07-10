import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { getSDK } from "open-im-sdk-wasm";

const OpenIM = getSDK();

// Create ChatContext
const ChatContext = createContext();

// Create a custom hook to use the AuthContext
export const UseChat = () => {
	return useContext(ChatContext);
};

// Create ChatProvider component
export const ChatProvider = ({ children }) => {
	const { user } = useSelector((state) => state.auth);
	const IMSDK = getSDK();

	const handleLogin = ({ userID }) => {
		const config = {
			userID: userID || "11111113", // IM user userID
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMTExMTExMyIsIlBsYXRmb3JtSUQiOjUsImV4cCI6MTcyODIzNDYyOCwibmJmIjoxNzIwNDU4MzI4LCJpYXQiOjE3MjA0NTg2Mjh9.3Ijgz1H7x5XOnGT55EuywXCWxb95tcpKtcJM2NUkeBg", // Your token here
			platformID: 5, // Current login platform number
			apiAddr: "http://127.0.0.1:10002", // IM API address
			wsAddr: "ws://127.0.0.1:10001", // IM WS address
		};

		// IMSDK.getLoginStatus()
		// 	.then(({ data }) => {
		// 		if (data === 1 || data === 2) {
		// 			console.log({ data });
		// 			IMSDK.login(config)
		// 				.then((res) => {
		// 					console.log("Login successful 1", res);
		// 				})
		// 				.catch((err) => {
		// 					console.error("Login failed", err);
		// 					console.error("Error details:", err.stack || err.message);
		// 				});
		// 		}
		// 	})
		// 	.catch((err) => {
		// Call failed
		// console.log("Error checking status", err);

		IMSDK.login(config)
			.then((res) => {
				console.log("Login successful", res);
			})
			.catch((err) => {
				console.error("Login failed", err);
				console.error("Error details:", err.stack || err.message);
			});
		// });
	};

	const handleSendMessage = ({ message }) => {
		IMSDK.createTextMessage(message)
			.then((data) => {
				console.log({ message: "Message created!", data });
				IMSDK.sendMessage({
					recvID: "11111112",
					groupID: "",
					message: data.data,
				})
					.then(({ data }) => {
						// Successful call
						console.log("Message sent now!", data);
					})
					.catch((err) => {
						// Failed call
						console.log("message not sent", err);
					});
			})
			.catch((err) => console.log(err));
	};

	const handleSendFile = ({ message }) => {
		IMSDK.createTextMessage(message)
			.then((data) => {
				console.log({ message: "Message created!", data });
				IMSDK.sendMessage({
					recvID: "11111112",
					groupID: "",
					message: data.data,
				})
					.then(({ data }) => {
						// Successful call
						console.log("Message sent now!", data);
					})
					.catch((err) => {
						// Failed call
						console.log("message not sent", err);
					});
			})
			.catch((err) => console.log(err));
	};

	const handleChatLogout = async () => {
		await IMSDK.logout();
	};

	const value = {
		sendMessage: handleSendMessage,
		sendFile: handleSendFile,
		chatLogout: handleChatLogout,
		chatLogin: handleLogin,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
	children: PropTypes.node,
};
