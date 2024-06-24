import PropTypes from "prop-types";
import { useState } from "react";
import { BaseButton } from "../../../component/button";
import { formatDate, formatNumber } from "../../../helpers/function";
import { EditIcon } from "../../../assets/edit-icon";
import profileAxios from "../../../helpers/profileAxios";
import { Overlay } from "../../../component/overlay-component";
import { toast } from "react-toastify";
import { GigSuccessModal } from "./gig-success-modal";
import { FundEscrow } from "../../../component/fund-escrow";

export function GigPreview({ steps, handleStep, form }) {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [openEscrow, setOpenEscrow] = useState(false);
	const [id, setId] = useState(null);

	const handleSubmit = () => {
		setLoading(true);
		profileAxios
			.post("/gigs", {
				isPhysical: form.isPhysical,
				longitude: form.latitude,
				latitude: form.longitude,
				address: form.address,
				isAddressSaved: form.isAddressSaved,
				title: form.title,
				description: form.description,
				isExperienced: form.isExperienced,
				dressCode: form.dressCode,
				additionalInstruction: form.additionalInstruction,
				isSaved: form.isSaved,
				subCategoryId: form.subCategoryId,
				cityId: form.cityId,
				numberOfPros: form.numberOfPros,
				tiers: form.tiers,
				proRatings: form.proRatings,
				budget: form.budget,
				tips: form.tips,
				gigDate: form.gigDate,
				startTime: form.startTime,
				endTime: form.endTime,
			})
			.then((res) => {
				toast.success(res.message);
				setId(res.data.uuid);
				setOpen(true);
			})
			.catch((e) => {
				console.log(e);
				toast.error(e.response.data.message);
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className="max-w-screen-lg mx-auto m-2 bg-white rounded-md h-full">
			{loading && <Overlay message="Creating a new gig" />}
			<div className="block md:flex gap-8">
				<div className="w-full md:w-1/2">
					<div className="mb-2 p-4 border rounded-lg">
						<div className="flex justify-between items-center">
							<p className="text-xs">{form.address}</p>
							<span onClick={() => handleStep(steps[0])}>
								<EditIcon size={0.8} />
							</span>
						</div>
					</div>
					<div className="mb-2 p-4 border rounded-lg">
						<div className="flex justify-between items-center mb-4">
							<p className="font-bold">Gig Information</p>
							<span onClick={() => handleStep(steps[2])}>
								<EditIcon size={0.8} />
							</span>
						</div>
						<div>
							<div className="mb-4">
								<p className="text-sm">Gig Title</p>
								<p className="text-xs">{form.title}</p>
							</div>
							<div className="mb-4">
								<p className="text-sm">Gig Description</p>
								<p className="text-xs">{form.description}</p>
							</div>
							<div className="mb-4">
								<p className="text-sm">Dress Code</p>
								<p className="text-xs">{form.dressCode || "N/A"}</p>
							</div>

							<div className="mb-4">
								<p className="text-sm">Is Experience Required?</p>
								<div className="text-xs mt-2">
									<div className="px-6 py-2 rounded-full bg-light text-primary border w-fit">
										{form.isExperienced ? "Yes" : "No"}
									</div>
								</div>
							</div>
							<div className="mb-4">
								<p className="text-sm">Is Pro Presence Required?</p>
								<div className="text-xs mt-2">
									<div className="px-6 py-2 rounded-full bg-light text-primary border w-fit">
										{form.isPhysical ? "Yes" : "No"}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-2 p-4 border rounded-lg">
						<div className="flex justify-between items-center mb-4">
							<p className="text font-bold">Date & Time</p>
							<span onClick={() => handleStep(steps[3])}>
								<EditIcon size={0.8} />
							</span>
						</div>
						<div>
							<div className="mb-4">
								<p className="text-xs">Date</p>
								<p className="text-sm font-bold">{formatDate(form.gigDate)}</p>
							</div>
							<div>
								<p className="text-xs">Time Range</p>
								<p className="text-sm font-bold">
									{form.startTime}- {form.endTime}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full md:w-1/2">
					<div className="px-4 py-6 border rounded-lg mt-4">
						<p className="font-bold text-2xl mb-4">Set Budget</p>
						{/* <div className="mb-4">
							<p className="text-sm">Industry</p>
							<p className="text-xs flex gap-2 items-center flex-wrap mt-2">
								<span className="p-2 rounded-full bg-light text-primary border">
									Hospitality
								</span>
								<span></span>
								<span className="p-2 rounded-full bg-light text-primary border">
									Event Server
								</span>
							</p>
						</div> */}
						<div className="mb-4">
							<p className="text-sm">Tier</p>
							<p className="text-xs flex gap-2 items-center flex-wrap mt-2">
								{form.tiers.map((item) => (
									<span
										key={item}
										className="p-2 rounded-full bg-light text-primary border"
									>
										{item}
									</span>
								))}
							</p>
						</div>
						<div className="mb-4">
							<p className="text-sm">Pro Rating</p>
							<p className="text-xs flex gap-2 items-center flex-wrap mt-2">
								{form.proRatings.map((item) => (
									<span
										key={item}
										className="p-2 rounded-full bg-light text-primary border"
									>
										{item}
									</span>
								))}
							</p>
						</div>
						<div>
							<p>Total Budget</p>
							<p className="text-xl text-primary font-bold">
								N{formatNumber(form.budget, 2)}
							</p>
						</div>
					</div>
					<div className="mt-4">
						<BaseButton onClick={handleSubmit}>Create Gig</BaseButton>
					</div>
				</div>
			</div>

			{open && (
				<GigSuccessModal
					open={open}
					handleClose={() => setOpen(false)}
					openEscrow={() => setOpenEscrow(true)}
				/>
			)}
			{openEscrow && (
				<FundEscrow
					open={openEscrow}
					handleClose={() => setOpenEscrow(false)}
					amount={form.budget}
					id={id}
				/>
			)}
		</div>
	);
}

GigPreview.propTypes = {
	handleStep: PropTypes.func,
	steps: PropTypes.array, // Proper usage of PropTypes
	form: PropTypes.object,
};
