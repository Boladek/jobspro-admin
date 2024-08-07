import { useState } from "react";
import { Skills } from "../../more/profile/skills";
import { UseAuth } from "../../../context/auth-context";
import { PenIcon } from "../../../assets/pen-icon";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";

export function SkillsSection() {
	const { user, refetch } = UseAuth();
	const [open, setOpen] = useState(false);

	function deleteSkill(skillId) {
		profileAxios
			.delete(`/profile/skillset/${skillId}`)
			.then((res) => toast.success(res.message))
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => refetch());
	}

	return (
		<div className="pr-2">
			<div className="py-1 px-6 rounded-full border bg-gray-50 w-fit  text-adminPrimary border-adminPrimary mb-2">
				Skills
			</div>
			{/* <p className="text-xs font-bold mb-1">Skills</p> */}
			<div className="flex justify-between gap-2">
				<div>
					{user && user?.userSkillSets.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{user.userSkillSets.map((skill) => (
								<div
									key={skill.uuid}
									className="flex gap-2 py-1 px-4 rounded-full bg-[#408CFF] text-white text-sm"
								>
									<span className="">{skill.skill}</span>
									<span
										onClick={() => deleteSkill(skill.id)}
										className="material-symbols-outlined cursor-pointer"
									>
										&#x2716;
									</span>
								</div>
							))}
						</div>
					) : (
						<p onClick={() => setOpen(true)}>
							No Skills Added yet. Please click here to update skills
						</p>
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
