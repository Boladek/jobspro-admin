import { generateArray } from "../../../helpers/function";

export function Transactions() {
	return (
		<div>
			<p className="text-adminPrimary font-semibold text-sm">Transactions</p>
			<div>
				{generateArray(10).map((_, index) => (
					<div key={Math.random()} className="flex gap-2 items-center mb-2">
						<div
							className={`${
								index % 2 === 0 ? "bg-[#FFDE16]" : "bg-[#664DFF]"
							} h-10 w-10 flex justify-center items-center rounded-md text-xs font-bold text-white`}
						>
							{index % 2 === 0 ? "IN" : "OUT"}
						</div>
						<div className="flex-1 text-xs">
							<p className="text-primary font-semibold">NGN 20,000</p>
							<p className="">Transfer in from GIG - Clean the dishes and dishwasher</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
