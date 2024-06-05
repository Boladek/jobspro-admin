import { useMemo, useState } from "react";
import { EditIcon } from "../../../assets/edit-icon";
import { Specialization } from "./specialization";
import { UseAuth } from "../../../context/auth-context";
import profileAxios from "../../../helpers/profileAxios";
import { toast } from "react-toastify";
import { Overlay } from "../../../component/overlay-component";

export function SpecializationDescription() {
	const { user } = UseAuth();
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
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			})
			.finally(() => setLoading(false));
	};


	return (
		<>
			{loading && <Overlay message="Deleting Industry" />}
			<div className="border border-primary rounded-lg p-2 mb-2">
				<div className="flex justify-between mb-4">
					<p className="text-base">Sub-Categories</p>
					<span onClick={() => setOpen(true)}>
						<EditIcon size={0.7} />
					</span>
				</div>
				<div className="flex gap-2 items-center flex-wrap">
					{user && user.industryBelongTo && user.industryBelongTo.length > 0 ? (
						allSubs?.map((item) => (
							<div
								key={item.id}
								className="p-2 hover:pr-4 border rounded-full text-xs capitalize bg-light relative overflow-hidden"
							>
								{item?.name || "N/A"}
								<span
									className="absolute top-0 left-0 h-full w-full flex justify-end items-center opacity-0 hover:opacity-80 bg-gray-200"
									onClick={() => handleIndustry(item.id)}
								>
									<span className="h-5 w-5 cursor-pointer border border-red-500 text-xs rounded-full flex items-center justify-center text-red-500 font-bold">
										&times;
									</span>
								</span>
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
