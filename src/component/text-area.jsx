import React from "react";
import PropTypes from "prop-types";

export const BaseTextArea = React.forwardRef(
	(
		{ label, id, handleChange, value, error, height = 8, errorText, ...rest },
		ref
	) => {
		return (
			<div className="w-full">
				<label className="inline-block text-gray-600 text-sm mb-1" htmlFor={id}>
					{label}
				</label>
				<textarea
					className={`bg-gray-100 w-full resize-none px-3 py-3 border text-sm rounded-lg focus:outline-none focus:border-blue-500`}
					style={{ height: `${height}rem` }}
					ref={ref}
					id={id}
					value={value}
					onChange={handleChange}
					{...rest}
				/>
				{error && errorText ? (
					<p className="text-xs text-red-600 mt-1">{errorText}</p>
				) : null}
			</div>
		);
	}
);

BaseTextArea.displayName = "NativeInput";

BaseTextArea.propTypes = {
	label: PropTypes.string,
	errorText: PropTypes.string,
	id: PropTypes.string,
	handleChange: PropTypes.func,
	value: PropTypes.any,
	style: PropTypes.object,
	error: PropTypes.bool,
	height: PropTypes.number,
};
