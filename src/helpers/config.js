export const configKeys = {
	googleId: import.meta.env.VITE_GOOGLE_ID,
	baseURL:
		import.meta.env.VITE_BASE_URL ||
		"http://sso-lb-1694833758.us-west-2.elb.amazonaws.com",
	facebookId: import.meta.env.VITE_FB_ID,
	facebookSecret: import.meta.env.VITE_FB_SECRET,
	microsoftID: import.meta.env.VITE_MS_ID,
	microsoftSecret: import.meta.env.VITE_MS_SECRET,
	wsAddress: import.meta.env.VITE_WS_ADDRESS || "http://54.191.23.207:10002",
	apiAddress: import.meta.env.VITE_API_ADDRESS || "ws://54.191.23.207:10001",
	placesApiID: import.meta.env.VITE_PLACES_ID,
};
