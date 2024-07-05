import PropTypes from "prop-types";
import { useState } from "react";
import { BaseButton } from "./button";
import { getDifferenceInHours } from "../helpers/function";
import { Modal } from "./modal";
import { StarIcon } from "../assets/admin/star-icon";
import avatar from "../assets/profile-avatar.png";
import profileAxios from "../helpers/profileAxios";
import { useParams } from "react-router-dom";
import { Overlay } from "./overlay-component";
import { toast } from "react-toastify";
import { KycTag } from "./kyc-tag";

export function PropComponent({ pro, gig, refetch }) {
	const { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [openHire, setOpenHire] = useState(false);

	const hirePro = () => {
		setLoading(true);
		profileAxios
			.post("/gigs/hire", {
				gigId: id,
				applicationId: gig.gigApplies[0].uuid,
			})
			.then((res) => {
				toast.success(res.message);
				refetch();
			})
			.catch((err) => toast.error(err.response.data.message))
			.finally(() => setLoading(false));
	};

	return (
		<>
			{loading && <Overlay message="Hiring Pro" />}
			<div
				className="bg-white p-3 rounded-xl border cursor-pointer"
				onClick={() => setOpen(true)}
			>
				<div className="flex justify-between items-center">
					<div className="py-3 text-xs text-gray-600 flex gap-1 items-center">
						<div className="p-2 font-2xl h-12 w-12 flex items-center text-primary font-bold text-xl bg-light justify-center rounded-full">
							{pro.user.firstName[0]}
							{pro.user.lastName[0]}
						</div>
						<div>
							<p className="font-bold">
								{pro.user.firstName} {pro.user.lastName}
							</p>
							<KycTag text={pro.user.completedTier} />
							{/* <div className="capitalize">{pro.user.completedTier}</div> */}
						</div>
					</div>
					<div className="flex">
						<div className="px-2 py-1 rounded-full border flex items-center text-xs gap-2 text-gray-500">
							<span>
								<StarIcon filled size={0.75} />
							</span>
							<span>
								{pro.user.rating ?? 0}({pro.user.numberOfRatings})
							</span>
						</div>
					</div>
				</div>
				<hr />
				<div className="pt-2">
					<p className="mb-2 text-xs text-gray-500">
						Has{" "}
						<span className="text-black font-bold">
							{pro.user.userSkillSets.length} relevant
						</span>{" "}
						skills relating to your job
					</p>
					<div className="flex gap-2 flex-wrap">
						{pro.user.userSkillSets.map((item) => (
							<span
								key={item.uuid}
								className="text-xs p-2 border rounded-full bg-light"
							>
								{item.skill}
							</span>
						))}
					</div>
				</div>
			</div>
			{open && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-gray-400/30 flex justify-end"
					style={{
						zIndex: 20,
					}}
					onClick={() => setOpen(false)}
				>
					<div
						className="bg-white p-2 w-full max-w-lg flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-end">
							<span
								className="p-2 cursor-pointer hover:scale-110 text-2xl text-red-500"
								onClick={() => setOpen(false)}
							>
								&times;
							</span>
						</div>
						<div className="p-2 flex-1 min-h-96 overflow-y-auto">
							<div className="mx-auto w-full max-w-lg px-4">
								<div className="flex items-center gap-2 mb-4">
									<img
										src={pro.user.profilePicture ?? avatar}
										alt="User Avatar"
										className="h-20 w-20 rounded-full"
									/>
									<div>
										<p className="font-bold text-adminPrimary">
											{pro.user.firstName} {pro.user.lastName}
										</p>
										<p className="text-xs">{pro.user.finclusionId}</p>
									</div>
								</div>
								<div className="p-4 rounded-lg border mb-4">
									<p className="font-bold mb-2">What the Pro has to say</p>
									<p className="text-xs text-gray-500">
										{pro.additionalComment || "N/A"}
									</p>
								</div>

								{/* <div className="p-4 rounded-lg border mb-4">
									<p className="font-bold mb-2">Work Pics</p>
									<div className="flex gap-2 overflow-x-auto">
										{generateArray(4).map(() => (
											<img
												key={Math.random()}
												src={avatar}
												alt="Work Pic"
												className="h-20 rounded-lg"
											/>
										))}
									</div>
								</div> */}

								<div className="p-4 rounded-lg border mb-4">
									<p className="font-bold mb-2">Skills</p>
									<div className="pt-2">
										<p className="mb-2 text-xs text-gray-500">
											Has{" "}
											<span className="text-black font-bold">
												{pro.user.userSkillSets.length} relevant
											</span>{" "}
											skills relating to your job
										</p>
										<div className="flex gap-2 flex-wrap">
											{pro.user.userSkillSets.map((item) => (
												<span
													key={item.uuid}
													className="text-xs p-2 border rounded-full bg-light"
												>
													{item.skill}
												</span>
											))}
										</div>
									</div>
								</div>

								{/* <div className="p-4 rounded-lg border mb-4">
									<div className="flex justify-between">
										<p className="font-bold mb-2">Reviews</p>
										<p className="text-xs underline text-gray-500 cursor-pointer">
											See All
										</p>
									</div>
									<div className="flex justify-between items-center text-sm">
										<p className="text-sm">Punctuality</p>
										<div className="flex gap-1 items-center">
											{generateArray(5).map(() => (
												<StarIcon filled key={Math.random()} size={0.85} />
											))}
											5.00
										</div>
									</div>
									<div className="flex justify-between items-center text-sm pt-2">
										<p className="text-sm">Punctuality</p>
										<div className="flex gap-1 items-center">
											{generateArray(5).map(() => (
												<StarIcon filled key={Math.random()} size={0.85} />
											))}
											5.00
										</div>
									</div>
									<div className="flex justify-between items-center text-sm pt-2">
										<p className="text-sm">Punctuality</p>
										<div className="flex gap-1 items-center">
											{generateArray(5).map(() => (
												<StarIcon filled key={Math.random()} size={0.85} />
											))}
											5.00
										</div>
									</div>
								</div> */}
								<div className="flex gap-2">
									<div className="flex-1">
										<BaseButton variant="sec" onClick={() => setOpenHire(true)}>
											Hire
										</BaseButton>
									</div>
									{/* <div className="flex-1">
										<BaseButton>Message</BaseButton>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{openHire && (
				<Modal
					open={openHire}
					handleClose={() => setOpenHire(false)}
					maxWidth={400}
				>
					<form
						className="py-4 h-full flex flex-col"
						style={{ maxWidth: 500, width: "100%" }}
						// onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex-1 md:flex md:justify-center md:items-center">
							<div>
								<p className={`text-primary text-3xl font-bold mb-4`}>
									Are you sure you want to Hire this pro?
								</p>
								<p className="text-xs text-gray-500 mb-4">
									You're about to hire {pro?.user?.finclusionId} for a{" "}
									{getDifferenceInHours(gig.startTime, gig.endTime)}hrs service.
								</p>
							</div>
						</div>

						<div>
							<BaseButton type="button" onClick={hirePro}>
								Next
							</BaseButton>
						</div>
					</form>
				</Modal>
			)}

			{openHire && (
				<Modal
					open={openHire}
					handleClose={() => setOpenHire(false)}
					maxWidth={400}
				>
					<form
						className="p-4 h-full flex flex-col"
						style={{ maxWidth: 500, width: "100%" }}
						// onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex-1 md:flex md:justify-center md:items-center border p-4 rounded-lg mb-4">
							<div>
								<div className="flex flex-col items-center gap-2 mb-2">
									<img
										src={pro.user.profilePicture ?? avatar}
										alt="Profile Picture"
										loading="lazy"
										className="h-24 w-24 rounded-full"
									/>
									<KycTag text={pro.user.completedTier} />
								</div>
								<p className={`text-3xl font-bold mb-4`}>
									Hire {pro.user.firstName} {pro.user.lastName}
								</p>
								<p className="text-xs text-gray-500">
									You&apos;re about to hire{" "}
									<strong>
										{pro.user.firstName} {pro.user.lastName}
									</strong>{" "}
									for a {getDifferenceInHours(gig.startTime, gig.endTime)}hrs
									service.
								</p>
							</div>
						</div>

						<div>
							<BaseButton type="button" onClick={hirePro}>
								Hire
							</BaseButton>
						</div>
					</form>
				</Modal>
			)}
		</>
	);
}

PropComponent.propTypes = {
	pro: PropTypes.object,
	gig: PropTypes.object,
	refetch: PropTypes.func,
};
