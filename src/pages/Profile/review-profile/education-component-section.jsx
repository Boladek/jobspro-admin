import { DeleteIcon } from "../../../assets/delete-icon";
import { EditIcon } from "../../../assets/edit-icon";

export function EducationExperienceSection() {
	return (
		<div className="px-2 py-4 border border-blue-200 rounded-xl mb-4">
			<p className="text-[#206DB0] text-lg font-bold">Education</p>
			<hr />
			<div>
				<p className="text-lg font-bold">Computer Science</p>
				<p className="text-gray-500" style={{ fontSize: ".9rem" }}>
					University of Abuja (2019-Present)
				</p>
				<p className="text-gray-700" style={{ fontSize: ".8rem" }}>
					Lagos, Nigeria
				</p>
				<p className="text-gray-500 text-xs">
					Democracy is a system of government in which power is vested in the
					hands of the people, either directly or through elected
					representatives, and is exercised for the common good.
				</p>
			</div>
			<div className="flex justify-end gap-2 mt-2">
				{/* <img src={edit} className="h-7" />  */}
				<EditIcon />
				{/* <img src={deleteIcon} className="h-7" /> */}
				<DeleteIcon />
			</div>
		</div>
	);
}
