// import React from "react";
import { string, node } from "prop-types";
// import { TimeLineIcon } from "../assets/time-line-icon";

export function TiimeLineBox({ title, children }) {
	return (
		<div className="p-2 rounded-lg border bg-adminPrimary/10 border-adminPrimary">
			<div className="flex justify-between items-center">
				<p className="text-xs font-bold">{title}</p>
				<span>
					{/* <TimeLineIcon /> */}
				</span>
			</div>
			{children}
		</div>
	);
}

TiimeLineBox.propTypes = {
	title: string,
	children: node,
};
