import { EditIcon } from "../../../assets/edit-icon";

export function ShortBioSection() {
	return (
		<div>
			<div className="flex justify-between items-center mb-2">
				<p className="text-[#206DB0] text-xl font-bold">Short Bio</p>
				<EditIcon />
			</div>
			<p className="text-xs text-gray-600">
				Democracy is a system of government in which power is vested in the
				hands of the people, either directly or through elected representatives,
				and is exercised for the common good. It is characterized by principles
				of popular sovereignty, political equality, and majority rule, as well
				as respect for individual rights and freedoms.
			</p>
		</div>
	);
}
