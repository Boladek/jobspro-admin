import { HeadSection } from "./head-section";
import { AccountSwitch } from "./account-switch";
import { EscrowCard } from "./accounts/escrow-card";
import { WalletCard } from "./accounts/wallet-card";
import { BadgeCard } from "./accounts/badge-card";
import { ManageProfile } from "./manage-profile";
import { UseModal } from "../../context/wallet-context";
import { WalletSection } from "./wallet-section";

function AccountProfilePage() {
	// const { name, user } = UseAuth();
	const { openWallet } = UseModal();

	return (
		<div className="bg-white h-full px-4 py-1 relative">
			<div className="h-full w-full max-w-screen-2xl border border-adminPrimary mx-auto rounded-lg overflow-hidden flex flex-col">
				<div className="w-full">
					<HeadSection />
				</div>
				<div className="p-8 bg-light flex-1 relative">
					<div className="mb-4">
						<AccountSwitch />
					</div>
					<div className="flex gap-4 overflow-x-auto mb-4">
						<div className="max-w-sm w-full">
							<WalletCard />
						</div>
						<div className="max-w-sm w-full">
							<EscrowCard />
						</div>
						<div className="max-w-sm w-full">
							<BadgeCard />
						</div>
					</div>
					<div>
						<p className="text-sm text-primary mb-4">Manage Profile</p>
						<ManageProfile />
					</div>
					{openWallet && <WalletSection />}
				</div>
			</div>
		</div>
	);
}

export default AccountProfilePage;
