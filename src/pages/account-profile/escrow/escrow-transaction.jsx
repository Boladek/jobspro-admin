import circle from "../../../assets/cycle.svg";
import { object } from "prop-types";
import { formatDate, formatNumber } from "../../../helpers/function";

export function EscrowTransaction({ transaction }) {
	return (
		<div className="w-full border-b-gray-200 py-2 gap-4 border-b flex justify-between items-center">
			<div className="p-2 rounded-full bg-primary w-fit">
				<img src={circle} alt="Circle" className="h-5" />
			</div>
			<div className="flex-1">
				<p className="text-sm">{transaction.remarks || "N/A"}</p>
				<p className="text-tiny">{formatDate(transaction.createdAt)}</p>
			</div>
			<div className="text-xs">
				<p>NGN {formatNumber(transaction.amount)}</p>
				<div className="py-1 px-3 rounded-full border bg-gray-100 w-fit">
					{transaction.status}
				</div>
			</div>
		</div>
	);
}

EscrowTransaction.propTypes = {
	transaction: object.isRequired,
};
