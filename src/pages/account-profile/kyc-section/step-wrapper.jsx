import { useState } from "react";
import { string, node } from "prop-types";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export function StepWrapper({ title, children }) {
	const [expanded, setExpanded] = useState(false);
	return (
		<div className="p-4 border rounded-md">
			<div className="flex justify-between items-center">
				<div className="font-bold text-sm text-adminPrimary">{title}</div>
				<div
					onClick={() => setExpanded((prev) => !prev)}
					className="text-2xl flex gap-1 items-center"
				>
					<span className="text-tiny">See all requirements</span>
					{!expanded ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
				</div>
			</div>
			<div></div>
			{expanded && <div className="py-2">{children}</div>}
		</div>
	);
}

StepWrapper.propTypes = {
	title: string,
	children: node,
};
