import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import { AccountBio } from "./bio";
import { WorkRate } from "./work-rate";
import { SkillsSection } from "./skills-section";
import { UseAuth } from "../../../context/auth-context";

export function ProfileSection() {
	const { user } = UseAuth();
	const { openProfile, handleCloseProfile } = UseModal();
	return (
		<SideWrapper
			open={openProfile}
			handleClose={handleCloseProfile}
			title="Account"
		>
			<AccountBio />
			{user.userType === "pro" && (
				<>
					<WorkRate />
					<SkillsSection />
				</>
			)}
		</SideWrapper>
	);
}
