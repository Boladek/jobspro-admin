import PropTypes from "prop-types";
import { Spinner } from "./spinner";
// import styled, { keyframes } from "styled-components";

export const SquareButton = ({
	children,
	// loading,
	variant = "solid",
	// size = "normal",
	...rest
}) => {
	return (
		<button
			{...rest}
			className={`p-3 rounded-md border bg-primary w-full flex justify-between text-xs font-bold items-center ${handleVariant(
				variant
			)}`}
		>
			<span className="font-bold">{children}</span>
			<span>&rarr;</span>
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

SquareButton.propTypes = {
	loading: PropTypes.bool,
	variant: PropTypes.string,
	children: PropTypes.any,
	size: PropTypes.string,
};
