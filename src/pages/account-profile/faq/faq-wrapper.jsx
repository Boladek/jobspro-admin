import { useState } from "react";
import { string, node } from "prop-types";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export function FAQWrapper({ title, children }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<div className="px-4 py-3 border border-primary rounded-lg">
			<div
				className="flex justify-between items-center select-none"
				onClick={() => setExpanded((prev) => !prev)}
			>
				<div className="font-bold text-sm text-primary">{title}</div>
				<div className="text-2xl">
					{!expanded ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
				</div>
			</div>
			{expanded && (
				<div className="py-2 text-gray-500 text-xs border-t mt-2">
					{children}
				</div>
			)}
		</div>
	);
}

FAQWrapper.propTypes = {
	title: string,
	children: node,
};
