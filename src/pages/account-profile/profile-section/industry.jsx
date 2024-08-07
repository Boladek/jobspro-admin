import { useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

// import { BaseButton } from "../../../component/button";
// import { BaseSelect } from "../../../component/select";
import profileAxios from "../../../helpers/profileAxios";
import { Overlay } from "../../../component/overlay-component";
import { PenIcon } from "../../../assets/pen-icon";
import { UseAuth } from "../../../context/auth-context";
import { Specialization } from "../../more/profile/specialization";

export function Industry() {
	const { user, refetch } = UseAuth();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const allSubs = useMemo(() => {
		if (user && user.industryBelongTo && user.industryBelongTo.length > 0) {
			return user.industryBelongTo.map((item) => item.subCategory);
		}
		return [];
	}, [user]);

	const handleIndustry = (id) => {
		setLoading(true);
		profileAxios
			.delete(`/profile/subcategories/${id}`)
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
		<div className="pr-2">
			{loading && <Overlay message="Deleting Specialization" />}
			<div className="py-1 px-6 rounded-full border bg-gray-50 w-fit  text-adminPrimary border-adminPrimary mb-2">
				Industry/Specialization
			</div>
			<div className="flex justify-between gap-2">
				<div>
					{allSubs && allSubs.length > 0 ? (
						<div className="flex flex-wrap gap-2">
							{allSubs.map((sub) => (
								<div
									key={sub.uuid}
									className="flex gap-2 py-1 px-4 rounded-full bg-[#408CFF] text-white text-sm"
								>
									<span className="">{sub.name}</span>
									<span
										onClick={() => handleIndustry(sub.id)}
										className="material-symbols-outlined cursor-pointer"
									>
										&#x2716;
									</span>
								</div>
							))}
						</div>
					) : (
						<p onClick={() => setOpen(true)}>
							Please click here to update your specialisation.
						</p>
					)}
				</div>
				<div onClick={() => setOpen(true)} className="w-15">
					<PenIcon />
				</div>
			</div>

			{open && (
				<Specialization open={open} handleClose={() => setOpen(false)} />
			)}
		</div>
	);
}
