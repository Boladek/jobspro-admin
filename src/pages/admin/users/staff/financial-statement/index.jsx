import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { UseFinancialContext } from "../../../../../context/financial-statement-context";
import { FaCalendarAlt } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

export function FinancialStatement() {
	const { tabs, activeTab, handleTab, months, handleMonth, currentMonth } =
		UseFinancialContext();
	return (
		<div className="border border-adminPrimary rounded-md p-4">
			<div className="flex gap-4 mb-4">
				<div className="text-adminPrimary">
					<div className="flex items-center gap-2">
						<div className="text-xl/3 font-bold">Jobs Pro</div>
						<div className="w-14">
							<ProgressBar color="#0FFF9A" thickness={1.2} />
						</div>
					</div>
					<div className="text-2xl font-extralight">Financial Statement</div>
				</div>
				<div className="flex-1">
					<div className="flex bg-[#664DFF] rounded-md w-fit items-center mx-auto">
						<div className="flex gap-2 items-start ">
							{tabs.map((tab) => (
								<div
									key={tab}
									className={`px-6 py-2 capitalize text-sm cursor-pointer transition-all ease-linear 300s ${
										activeTab === tab
											? "text-white font-semibold"
											: "text-gray-300"
									}`}
									onClick={() => handleTab(tab)}
								>
									{tab}
									{activeTab === tab && (
										<div className="w-10">
											<ProgressBar color="#FEDF00" />
										</div>
									)}
								</div>
							))}
						</div>
						<div className="text-white flex gap-2 items-center px-4">
							<FaCalendarAlt />
							<span className="text-sm">Year</span>
							<TiArrowSortedDown />
						</div>
					</div>
				</div>
			</div>
			<div className="mb-4">
				{activeTab === tabs[0] && (
					<div className="flex w-full">
						<div className="w-20">Month</div>
						<div className="flex-1 flex justify-between">
							{months.map((month) => (
								<div
									key={month}
									className={`py-2 flex-1 text-center text-xs rounded-lg cursor-pointer ${
										currentMonth === month
											? "bg-[#FFDE16] text-[#025949] font-semibold"
											: ""
									}`}
									onClick={() => handleMonth(month)}
								>
									{month}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
			<div>
				
			</div>
		</div>
	);
}
