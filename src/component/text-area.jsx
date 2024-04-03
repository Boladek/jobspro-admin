import React, { useState } from "react";

export const BaseTextArea = React.forwardRef(
	(
		{
			label,
			id,
			handleChange,
			value,
			style,
			error,
			errorText,
			hasHint,
			hint,
			helper,
			...rest
		},
		ref
	) => {
		return (
			<div className="w-full">
				<label className="inline-block text-gray-600 text-sm mb-1" htmlFor={id}>
					{label}
				</label>
				<textarea
					className="bg-gray-100 w-full resize-none px-3 py-3 border text-sm rounded-lg focus:outline-none focus:border-blue-500"
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
