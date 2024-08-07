import { useState } from "react";
import { UseModal } from "../../../context/modal-context";
import { IoIosCopy } from "react-icons/io";
import { WithdrawIcon } from "../../../assets/withdraw-icon";
import { FundWalletIcon } from "../../../assets/fund-wallet-icon";
import { AnalyticsIcon } from "../../../assets/analytics-icon";
import { Transactions } from "./transactions";
import { Funding } from "./funding";
import { Withdrawal } from "./withdrawal";
import { SideWrapper } from "../../../component/side-wrapper";
import { GenerateVirtualAccounts } from "./generate-virtual-account";
import { GoPlusCircle } from "react-icons/go";
import { UseAuth } from "../../../context/auth-context";
import { CopyTextHook } from "../../../hooks/copy-hook";

const tabs = [
	{ title: "Transactions", icon: AnalyticsIcon },
	{ title: "Fund Wallet", icon: FundWalletIcon },
	{ title: "Withdraw", icon: WithdrawIcon },
	// { title: "Escrow", icon: FundWalletIcon },
];

export function WalletSection() {
	const { copyToClipboard } = CopyTextHook();
	const [open, setOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(tabs[0].title);
	const { handleCloseWallet } = UseModal();
	const { accounts, refetchWalletBalance, gettingWalletDetails } = UseAuth();

	return (
		<SideWrapper handleClose={handleCloseWallet} title="Wallet">
			<div>
				<div className="text-xs mb-4">
					<p className="font-bold">Bank Details</p>
					<p>
						You can fund your wallet by transferring directly to the account
						below or clicking fund wallet
					</p>
				</div>
				<div className="mb-4 p-4 bg-primary rounded-lg text-white text-xs flex justify-between items-center">
					{gettingWalletDetails ? (
						<div className="text-center w-full font-bold py-2">
							Please wait...
						</div>
					) : (
						<>
							{accounts && accounts.data && (
								<>
									<div>
										<p className="font-extralight">Bank</p>
										<p className="font-bold">VFD Bank</p>
									</div>
									<div>
										<p className="font-extralight">Account No</p>
										<p className="font-bold">
											{accounts?.data?.user?.finclusionAccountNumber}
										</p>
									</div>
									<IoIosCopy
										className="text-xl cursor-pointer"
										onClick={() =>
											copyToClipboard(
												accounts?.data?.user?.finclusionAccountNumber
											)
										}
									/>
								</>
							)}
							{accounts && accounts.data === null && (
								<div
									onClick={() => setOpen(true)}
									className="text-center w-full cursor-pointer"
								>
									<p className="text-sm">Click here to create account</p>
									<div className="flex justify-center">
										<GoPlusCircle className="text-3xl" />
									</div>
								</div>
							)}
						</>
					)}
				</div>

				<div className="mb-4">
					{activeTab === tabs[0].title && (
						<div className="flex w-full justify-between items-end">
							{tabs.map((tab) => (
								<div
									key={tab.title}
									onClick={() => setActiveTab(tab.title)}
									className="text-center items-center"
								>
									<div className="flex justify-center">
										<div className="p-3 border rounded-full cursor-pointer">
											<tab.icon />
										</div>
									</div>
									<p
										className="text-xs text-gray-500"
										style={{ fontSize: ".65rem" }}
									>
										{tab.title}
									</p>
								</div>
							))}
						</div>
					)}
				</div>

				{activeTab !== tabs[0].title && (
					<div className="flex justify-between text-xs items-center mb-4">
						<div className="text-primary font-bold flex gap-2 items-center">
							<div className="p-3 border rounded-full">
								{activeTab === tabs[1].title && <FundWalletIcon />}
								{activeTab === tabs[2].title && <WithdrawIcon />}
							</div>
							{activeTab}
						</div>
						<div
							onClick={() => setActiveTab(tabs[0].title)}
							className="hover:underline cursor-pointer"
						>
							Back
						</div>
					</div>
				)}

				<div>
					{activeTab === tabs[0].title && <Transactions />}
					{activeTab === tabs[1].title && <Funding />}
					{activeTab === tabs[2].title && <Withdrawal />}
					{/* {activeTab === tabs[3].title && <Withdrawal />} */}
				</div>
			</div>

			{open && (
				<GenerateVirtualAccounts
					open={open}
					handleClose={() => setOpen(false)}
					refetch={refetchWalletBalance}
				/>
			)}
		</SideWrapper>
	);
}
