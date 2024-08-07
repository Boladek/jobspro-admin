import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import { AccountBio } from "./bio";
import { WorkRate } from "./work-rate";
import { SkillsSection } from "./skills-section";
import { UseAuth } from "../../../context/auth-context";
import { WorkExperience } from "./work-experience";
import { Education } from "./education";
import { Industry } from "./industry";

export function ProfileSection() {
	const { user } = UseAuth();
	const { openProfile, handleCloseProfile } = UseModal();
	return (
		<SideWrapper
			open={openProfile}
			handleClose={handleCloseProfile}
			title="Profile"
		>
			<div className="w-[450px] grid grid-cols-1 gap-8 pb-8">
				<AccountBio />
				{user.userType === "pro" && (
					<>
						<WorkRate />
						<Industry />
						<SkillsSection />
						<WorkExperience />
						<Education />
					</>
				)}
			</div>
		</SideWrapper>
	);
}
