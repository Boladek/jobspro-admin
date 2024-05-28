import { useMemo, useState } from "react";
import { EditIcon } from "../../../assets/edit-icon";
import { Specialization } from "./specialization";
import { UseAuth } from "../../../context/auth-context";

export function SpecializationDescription() {
	const { user } = UseAuth();
	const [open, setOpen] = useState(false);

	const allSubs = useMemo(() => {
		if (!user || user.industryBelongTo.length === 0) return [];
		return user.industryBelongTo.map((item) => item.subCategory);
	}, [user]);

	return (
		<>
			<div className="border border-primary rounded-lg p-2 mb-2">
				<div className="flex justify-between mb-4">
					<p className="text-base">Sub-Categories</p>
					<span onClick={() => setOpen(true)}>
						<EditIcon size={0.7} />
					</span>
				</div>
				<div className="flex gap-2 items-center flex-wrap">
					{user && user.industryBelongTo && user.industryBelongTo.length > 0 ? (
						allSubs.map((item) => (
							<div
								key={item.id}
								className="p-2 border rounded-full text-xs capitalize bg-light"
							>
								{item.name}
							</div>
						))
					) : (
						<span>No Subcateogeries setup yet</span>
					)}
				</div>
			</div>
			{open && (
				<Specialization open={open} handleClose={() => setOpen(false)} />
			)}
		</>
	);
}
