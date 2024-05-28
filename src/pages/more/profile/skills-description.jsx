import { useState } from "react";
import { EditIcon } from "../../../assets/edit-icon";
import { Skills } from "./skills";
import { UseAuth } from "../../../context/auth-context";

export function SkillsDescription() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className="border border-primary rounded-lg p-2 mb-2">
				<div className="flex justify-between mb-4">
					<p className="text-base">Skills</p>
					<span onClick={() => setOpen(true)}>
						<EditIcon size={0.7} />
					</span>
				</div>
				<div className="flex gap-2 items-center flex-wrap">
					{user &&
						user.userSkillSets &&
						user.userSkillSets.length > 0 &&
						user?.userSkillSets.map((item) => (
							<div
								key={item.uuid}
								className="p-2 border rounded-full text-xs capitalize bg-light"
							>
								{item.skill}
							</div>
						))}
				</div>
			</div>
			{open && <Skills open={open} handleClose={() => setOpen(false)} />}
		</>
	);
}
