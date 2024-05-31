import React from "react";

export function Actions() {
	return (
		<div className="w-full max-w-sm mx-auto flex gap-3">
			<div className="flex flex-col justify-center items-center w-1/3">
				<div className="h-12 w-12 rounded-full flex justify-center items-center bg-[#D4E6FF] cursor-pointer">
					<span>+</span>
				</div>
				<span className="text-xs text-gray-400">Withdraw</span>
			</div>

			<div className="flex flex-col justify-center items-center w-1/3">
				<div className="h-12 w-12 rounded-full flex justify-center items-center bg-[#00A82F] cursor-pointer">
					<span className="text-white">&#43;</span>
				</div>
				<span className="text-xs text-gray-400">Fund Wallet</span>
			</div>

			<div className="flex flex-col justify-center items-center w-1/3">
				<div className="h-12 w-12 rounded-full flex justify-center items-center bg-[#D4E6FF] cursor-pointer">
					<span className="text-black">&#128200;</span>
				</div>
				<span className="text-xs text-gray-400">Analytics</span>
			</div>
		</div>
	);
}
