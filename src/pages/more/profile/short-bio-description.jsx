import { useState } from "react";
import { EditIcon } from "../../../assets/edit-icon";
import { ShortBio } from "./short-bio";
import { UseAuth } from "../../../context/auth-context";

export function ShortBioDescription() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);

	return (
		<div className="border border-primary rounded-lg p-2">
			<div className="flex justify-between mb-4">
				<p className="text-base">Short Bio</p>
				<span onClick={() => setOpen(true)}>
					<EditIcon size={0.7} />
				</span>
			</div>
			<p className="text-xs text-gray-500">
				{user?.profileDescription || "N/A"}
			</p>

			{open && <ShortBio open={open} handleClose={() => setOpen(false)} />}
		</div>
	);
}
