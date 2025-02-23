import React from "react";
import PropTypes from "prop-types";

export const BaseSelect = React.forwardRef(
	(
		{
			children,
			label,
			id,
			handleChange,
			value,
			error,
			errorText,
			...rest
		},
		ref
	) => {
		return (
			<div className="w-full">
				<label className="inline-block text-gray-600 text-xs mb-1" htmlFor={id}>
					{label}
				</label>
				<select
					id={id}
					value={value}
					onChange={handleChange}
					ref={ref}
					{...rest}
					className="bg-gray-white w-full p-3 border text-xs rounded-md focus:outline-none focus:border-primary"
				>
					{children}
				</select>
				{error && errorText && (
					<p className="text-xs text-red-600 mt-1">{errorText}</p>
				)}
			</div>
		);
	}
);

BaseSelect.displayName = "NativeSelect";

BaseSelect.propTypes = {
	label: PropTypes.string,
	errorText: PropTypes.string,
	id: PropTypes.string,
	handleChange: PropTypes.func,
	value: PropTypes.any,
	error: PropTypes.bool,
	children: PropTypes.any,
};
