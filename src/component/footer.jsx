import React from "react";

export function Footer() {
	return (
		<div className="p-3 border-t text-gray-400 text-xs text-center">
			© JobsPro {new Date().getFullYear()}. All rights reserved
		</div>
	);
}
