import { useState } from "react";
import { EditIcon } from "../../../assets/edit-icon";
import { Skills } from "./skills";
import { UseAuth } from "../../../context/auth-context";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";

export function SkillsDescription() {
	const { user, refetch } = UseAuth();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSkill = (id) => {
		setLoading(true);
		profileAxios
			.delete(`/profile/skillset/${id}`)
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Deleting Skill" />}
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
								className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden"
							>
								{item.skill}
								<span
									className="absolute top-0 left-0 h-full w-full flex justify-end items-center opacity-0 hover:opacity-80 bg-gray-200"
									onClick={() => handleSkill(item.id)}
								>
									<span className="h-5 w-5 cursor-pointer border border-primary text-xs rounded-full flex items-center justify-center text-primary font-bold">
										&times;
									</span>
								</span>
							</div>
						))}
				</div>
			</div>
			{open && <Skills open={open} handleClose={() => setOpen(false)} />}
		</>
	);
}
