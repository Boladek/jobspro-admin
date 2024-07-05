import { HeadSection } from "./head-section";
import { AccountSwitch } from "./account-switch";
import { EscrowCard } from "./accounts/escrow-card";
import { WalletCard } from "./accounts/wallet-card";
import { BadgeCard } from "./accounts/badge-card";
import { ManageProfile } from "./manage-profile";
import { UseModal } from "../../context/modal-context";
import { WalletSection } from "./wallet-section";
import { KycSection } from "./kyc-section";
import { Escrow } from "./escrow";
import { ProfileSection } from "./profile-section";
import { FAQSection } from "./faq";
import { PasswordResetSection } from "./password-reset";
import { useEffect } from "react";

function AccountProfilePage() {
	// const { name, user } = UseAuth();
	const {
		openWallet,
		openKyc,
		openEscrow,
		openProfile,
		openFaq,
		openPassword,
	} = UseModal();

	useEffect(() => {
		document.title = "Account Profile";
	}, []);

	return (
		<div className="h-full p-0 md:px-4 md:py-1 relative">
			<div className="h-full w-full max-w-screen-2xl border md:border-adminPrimary mx-auto md:rounded-lg md:overflow-hidden overflow-y-scroll flex flex-col">
				<div className="w-full">
					<HeadSection />
				</div>
				<div className="px-2 py-4 md:p-8 bg-light flex-1 relative">
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
				</div>
			</div>
			{openWallet && <WalletSection />}
			{openKyc && <KycSection />}
			{openEscrow && <Escrow />}
			{openProfile && <ProfileSection />}
			{openFaq && <FAQSection />}
			{openPassword && <PasswordResetSection />}
		</div>
	);
}

export default AccountProfilePage;
