/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	// eslint-disable-next-line no-undef
	plugins: [require("flowbite/plugin")],
	theme: {
		extend: {
			colors: {
				primary: "#206DB0",
				secondary: "#528DC2",
				accent: "#EA8A13",
				error: "#FF3B30",
				dark: "#1E1E1E",
				light: "#F3F8FF",
				adminPrimary: "#408CFF",
			},
			backgroundImage: {
				"custom-gradient": "linear-gradient(90deg, #005AAA, #020C60)",
			},
		},
	},
};
