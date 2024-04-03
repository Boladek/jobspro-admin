import React from "react";

export function Sidebar({ isExpanded, handleExpanded }) {
	return (
		<div className="w-full h-full p-2 bg-[#ddd]">
			<div className={isExpanded ? "icon-wrapper expanded" : "icon-wrapper"}>
				<span
					className="material-symbols-outlined cursor-pointer text-red-500 text-5xl"
					onClick={handleExpanded}
				>
					{isExpanded ? "visibility" : "visibility_off"}
				</span>
			</div>
			<button className="rounded-full bg-blue-700 text-white p-1">close</button>
			<div>
				<ol>
					<li>Link 1</li>
					<li>Link 1</li>
					<li>Link 1</li>
					<li>Link 1</li>
				</ol>
			</div>
			<div>Logout Section</div>
		</div>
	);
}
