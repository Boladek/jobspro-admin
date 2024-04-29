/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#206DB0",
				secondary: "#528DC2",
				accent: "#EA8A13",
				error: "#FF3B30",
				dark: "#1E1E1E",
			},
		},
	},
	plugins: [],
};
