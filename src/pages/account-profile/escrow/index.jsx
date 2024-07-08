import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import escrowlock from "../../../assets/escrow-lock.svg";
import { FilterIcon } from "../../../assets/filter-icon";
import { SearchComponent } from "../../../component/search-component";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../helpers/profileAxios";
import { NoInfo } from "../../../component/no-info";
import { EscrowTransaction } from "./escrow-transaction";

export function Escrow() {
	const { openEscrow, handleCloseEscrow } = UseModal();

	const { data: transactions = [], isLoading } = useQuery({
		queryKey: ["escrow-transactions"],
		queryFn: () => profileAxios.get("/transactions/escrow-transaction"),
		select: (data) => data.data.data,
		staleTime: Infinity,
	});

	const { data: recentTransactions = [], isLoading: gettingRecent } = useQuery({
		queryKey: ["escrow-transactions-recent"],
		queryFn: () => profileAxios.get("/transactions/recent-escrow-transactions"),
		select: (data) => data.data.data,
		staleTime: Infinity,
	});

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
					{gettingRecent && <div className="progress"></div>}
					{recentTransactions.length > 0 ? (
						recentTransactions.map((transaction) => (
							<EscrowTransaction
								transaction={transaction}
								key={transaction.uuid}
							/>
						))
					) : (
						<p>No recent Transactions</p>
					)}
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
					{isLoading && <div className="progress"></div>}
					{transactions.length > 0 ? (
						transactions.map((transaction) => (
							<EscrowTransaction
								transaction={transaction}
								key={transaction.uuid}
							/>
						))
					) : (
						<NoInfo message="You currently have no escrow transactions." />
					)}
				</div>
			</div>
		</SideWrapper>
	);
}
