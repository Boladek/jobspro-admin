import React, { useState } from "react";
import { Skills } from "../../more/profile/skills";
import { UseAuth } from "../../../context/auth-context";
import { PenIcon } from "../../../assets/pen-icon";

export function SkillsSection() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);
	return (
		<div className="mt-4 pr-2">
			<p className="text-xs font-bold mb-1">Skills</p>
			<div className="flex justify-between gap-2">
				<div>
					{user && user?.userSkillSets.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{user.userSkillSets.map((skill) => (
								<span
									key={skill.uuid}
									className="py-1 px-4 rounded-full bg-[#408CFF] text-white text-sm"
								>
									{skill.skill}
								</span>
							))}
						</div>
					) : (
						<p>Click here to update skills</p>
					)}
				</div>
				<div onClick={() => setOpen(true)} className="w-15">
					<PenIcon />
				</div>
			</div>

			{open && <Skills open={open} handleClose={() => setOpen(false)} />}
		</div>
	);
}
