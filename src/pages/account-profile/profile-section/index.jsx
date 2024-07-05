import React from "react";
import { SideWrapper } from "../../../component/side-wrapper";
import { UseModal } from "../../../context/modal-context";
import { AccountBio } from "./bio";
import { WorkRate } from "./work-rate";
import { SkillsSection } from "./skills-section";

export function ProfileSection() {
	const { openProfile, handleCloseProfile } = UseModal();
	return (
		<SideWrapper
			open={openProfile}
			handleClose={handleCloseProfile}
			title="Account"
		>
			<AccountBio />
			<WorkRate />
			<SkillsSection />
		</SideWrapper>
	);
}
