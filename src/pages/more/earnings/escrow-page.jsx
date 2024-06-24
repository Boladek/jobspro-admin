import { formatNumber } from "../../../helpers/function";

function EscrowPage() {
	return (
		<div className="p-4">
			<div className="max-w-sm mx-auto">
				<p className="text-3xl font-bold text-center mb-4">Escrow</p>
				<div className="p-4 py-8 border rounded-lg bg-[#005257] text-white">
					<p className="text-sm">Amount in Escrow</p>
					<p className="text-2xl">{formatNumber(100000)}</p>
				</div>
				<div className="py-4">
					<p className="text-bold">From</p>
					<div className="flex flex-col gap-2">
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EscrowPage;
