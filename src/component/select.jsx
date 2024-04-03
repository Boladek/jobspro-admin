import React from "react";

export const BaseSelect = React.forwardRef(
	(
		{
			children,
			label,
			id,
			handleChange,
			value,
			style,
			error,
			errorText,
			hasHint,
			hint,
			...rest
		},
		ref
	) => {
		return (
			<div className="w-full">
				<label className="inline-block text-gray-600 text-sm mb-1" htmlFor={id}>
					{label}
				</label>
				<select
					id={id}
					value={value}
					onChange={handleChange}
					ref={ref}
					{...rest}
					className="bg-gray-100 w-full px-3 py-3 border text-sm rounded-lg focus:outline-none focus:border-blue-500"
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
