import { object } from "prop-types";
import { formatNumber } from "../../../helpers/function";

export function TransactionCard({ transaction }) {
	return (
		<div className="flex gap-2 items-center mb-2">
			<div
				className={`${
					transaction.ledgerType === "credit" ? "bg-[#FFDE16]" : "bg-[#664DFF]"
				} h-10 w-10 flex justify-center items-center rounded-md text-xs font-bold text-white`}
			>
				{transaction.ledgerType === "credit" ? "IN" : "OUT"}
			</div>
			<div className="flex-1 text-xs">
				<p className="text-primary font-semibold">
					NGN {formatNumber(transaction.amount)}
				</p>
				<div className="flex justify-between items-center">
					<p>
						{transaction.type} - {transaction.remarks || "N/A"}
					</p>
					{/* <p className=""> {formatDate(transaction.createdAt)}</p> */}
				</div>
			</div>
		</div>
	);
}

TransactionCard.propTypes = {
	transaction: object,
};
