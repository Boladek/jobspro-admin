
import PropTypes from "prop-types";
import { Spinner } from "./spinner";
// import styled, { keyframes } from "styled-components";

export const BaseButton = ({
	children,
	loading,
	variant = "solid",
	...rest
}) => {
	return (
		<button
			className={`
			${
				loading
					? "bg-white outline outline-2 outline-primary cursor-not-allowed"
					: "cursor-pointer"
			}  
			${
				variant === "sec"
					? "bg-white text-primary outline outline-2 outline-primary hover:bg-blue-100"
					: "bg-primary text-white hover:bg-opacity-80"
			}
			flex justify-center 
			w-full p-3 rounded-full  text-sm font-bold`}
			{...rest}
			disabled={loading}
		>
			{loading ? <Spinner size={1} /> : children}
		</button>
	);
};

BaseButton.propTypes = {
	loading: PropTypes.bool,
	variant: PropTypes.string,
	children: PropTypes.any,
};
