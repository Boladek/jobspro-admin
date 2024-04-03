import React from "react";

export const Checkbox = ({
	id,
	label,
	// checked,
	// onChange,
	textPosition,
	...rest
}) => {
	const textAlignment = textPosition === "left" ? "text-right" : "text-left";

	return (
		<div className="flex items-center">
			{textPosition === "left" && (
				<label
					htmlFor={id}
					className={`mr-2 ${textAlignment} flex-grow text-xs`}
				>
					{label}
				</label>
			)}
			<input
				type="checkbox"
				id={id}
				// checked={checked}
				// onChange={onChange}
				{...rest}
				className="form-checkbox h-5 w-5 text-indigo-600 border-indigo-600 rounded"
			/>
			{textPosition === "right" && (
				<label
					htmlFor={id}
					className={`ml-2 ${textAlignment} flex-grow text-xs`}
				>
					{label}
				</label>
			)}
		</div>
	);
};
