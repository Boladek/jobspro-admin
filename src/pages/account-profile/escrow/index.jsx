import React from "react";
import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import escrowlock from "../../../assets/escrow-lock.svg";
import { FilterIcon } from "../../../assets/filter-icon";
import { SearchComponent } from "../../../component/search-component";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { generateArray } from "../../../helpers/function";
import circle from "../../../assets/cycle.svg";

export function Escrow() {
	const { openEscrow, handleCloseEscrow } = UseModal();
	return (
		<SideWrapper
			handleClose={handleCloseEscrow}
			title="Escrow"
			open={openEscrow}
		>
			<div className="flex gap-4 bg-[#664DFF] py-4 px-8 items-center text-white rounded-xl mb-4">
				<img src={escrowlock} alt="Escrow Lock" className="h-12" />
				<p className="text-xs">
					Your escrow transactions are secured by <strong>Sure escrow</strong>
				</p>
			</div>
			<div className="flex gap-2 items-center mb-4">
				<label htmlFor="search" className="flex-1">
					<SearchComponent placeholder="search" className="rounded-full" />
				</label>
				<span className="p-2 border rounded-full">
					<FilterIcon />
				</span>
			</div>
			<div className="mb-4">
				<div>
					<p className="text-sm">Recent</p>
					<div className="w-5">
						<ProgressBar color="#FEDF00" />
					</div>
				</div>
				<div className="grid grid-cols-1 py-2">
					{generateArray(3).map((_, index) => (
						<div
							key={Math.random()}
							className="w-full border-b-gray-200 gap-4 py-2 border-b flex justify-between items-center"
						>
							<div className="p-2 rounded-full bg-primary w-fit">
								<img src={circle} alt="Circle" className="h-5" />
							</div>
							<div className="flex-1">Description</div>
							<div className="text-xs">
								<p>NGN 20,000</p>
								<div className="py-1 px-3 rounded-full border bg-gray-100 w-fit">
									Status
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="mb">
				<div>
					<p className="text-sm">History</p>
					<div className="w-5">
						<ProgressBar color="#FEDF00" />
					</div>
				</div>
				<div className="grid grid-cols-1 py-2">
					{generateArray(9).map((_, index) => (
						<div
							key={Math.random()}
							className="w-full border-b-gray-200 py-2 gap-4 border-b flex justify-between items-center"
						>
							<div className="p-2 rounded-full bg-primary w-fit">
								<img src={circle} alt="Circle" className="h-5" />
							</div>
							<div className="flex-1">Description</div>
							<div className="text-xs">
								<p>NGN 20,000</p>
								<div className="py-1 px-3 rounded-full border bg-gray-100 w-fit">
									Status
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</SideWrapper>
	);
}
