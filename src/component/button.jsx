import PropTypes from "prop-types";
import { Spinner } from "./spinner";
// import styled, { keyframes } from "styled-components";

export const BaseButton = ({
	children,
	loading,
	variant = "solid",
	size = "normal",
	...rest
}) => {
	return (
		<button
			className={`
			${loading ? "bg-white cursor-not-allowed" : "cursor-pointer"}  
			${handleVariant(variant)}
			${size === "small" ? "p-2 text-xs font-semibold" : "p-3 text-sm font-bold"}
			flex justify-center border-2 
			w-full rounded-full`}
			{...rest}
			// disabled={loading}
		>
			{loading ? <Spinner size={1} /> : children}
		</button>
	);
};

function handleVariant(variant) {
	if (variant === "sec") {
		return "bg-white text-primary hover:bg-blue-100 border-primary";
	}
	if (variant === "danger") {
		return "bg-white text-red-500 hover:bg-red-100 border-red-500";
	}
	return "bg-primary text-white hover:bg-opacity-80 border-primary";
}

BaseButton.propTypes = {
	loading: PropTypes.bool,
	variant: PropTypes.string,
	children: PropTypes.any,
	size: PropTypes.string,
};
