import { formatNumber } from "../../../helpers/function";

export function WalletHistory() {
	return (
		<div className="w-full max-w-sm mx-auto flex h-full flex-col">
			<div className="flex justify-between items-center mb-2 w-full">
				<p className="font-bold">History</p>
				<span className="text-xs text-gray-500 underline cursor-default">
					See all
				</span>
			</div>
			<div className="border w-full flex-1 max-h-96 overflow-y-auto rounded-lg py-4 px-2">
				{generateArray(10).map((_item, index) => (
					<div key={index} className="flex w-full gap-2 py-2 items-center">
						<div
							className={`h-10 w-10 rounded-full flex justify-center items-center ${
								isEven(index) ? "bg-[#DBFFE5]" : "bg-[#E3F2FF]"
							}`}
						>
							{isEven(index) ? (
								<span className="text-[#24A148]">&uarr;</span>
							) : (
								<span className="text-primary">&darr;</span>
							)}
						</div>
						<div className="flex-1">
							<p className="font-bold">
								{isEven(index) ? "Withdrawal" : "Debit"}
							</p>
							<p className="text-xs text-gray-400">More body</p>
						</div>
						<p className="font-bold text-lg">N{formatNumber(10000)}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function generateArray(length) {
	if (typeof length !== "number" || length < 0) {
		throw new Error("Length must be a non-negative number");
	}

	return Array.from({ length }, (_, index) => index);
}

function isEven(number) {
	if (typeof number !== "number") {
		throw new Error("Input must be a number");
	}

	return number % 2 === 0;
}
