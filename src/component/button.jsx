import React from "react";
// import styled, { keyframes } from "styled-components";

export const BaseButton = ({
	children,
	loading,
	disabled,
	variant,
	...rest
}) => {
	return (
		<button
			type="button"
			className="bg-[#206DB0] w-full p-3 rounded-full text-white text-sm font-bold hover:outline hover:outline-2 hover:outline-[#206DB0] hover:bg-white hover:text-[#206DB0]"
			{...rest}
		>
			{loading ? "---" : children}
		</button>
	);
};
