import PropTypes from "prop-types";
import { useState } from "react";
import { BaseButton } from "../../../component/button";
// import { GigLocation } from "./gig-location";
import { GigInformationModal } from "./gig-information-modal";
import { EditIcon } from "../../../assets/edit-icon";
// import profileAxios from "../../../helpers/profileAxios";
// import { useQuery } from "@tanstack/react-query";

export function GigInformation({ handleForm, gotoNextStep, goBack }) {
	const [open, setOpen] = useState(false);
	const [gigTemplate, setGigTemplate] = useState({});

	// const { data, isLoading, refetch } = useQuery({
	// 	queryKey: ["gig-templates"],
	// 	queryFn: () => profileAxios.get(`/gigs/saved-template`),
	// 	select: (data) => data,
	// 	staleTime: Infinity,
	// });

	const handleClick = () => {
		gotoNextStep();
	};

	return (
		<div className="max-w-screen-sm mx-auto m-2 bg-white rounded-md h-full">
			{gigTemplate?.title && (
				<div className="p-4 border rounded-lg flex gap-2 items-center justify-between mx-auto max-w-sm mb-4">
					<div>{gigTemplate.title}</div>
					<div>
						<EditIcon size={0.75} />
					</div>
				</div>
			)}
			<div>
				<div className="py-4 max-w-sm mx-auto">
					<div
						onClick={() => setOpen(true)}
						className="p-3 border border-dashed border-primary rounded-full w-full text-center text-sm hover:text-secondary text-primary font-bold cursor-pointer hover:bg-gray-100 mx-auto"
					>
						Tell us more about the gig &#43;
					</div>
				</div>
			</div>

			<div className="flex max-w-sm mx-auto justify-center gap-2 mt-4">
				<div className="w-1/2">
					<BaseButton
						type="button"
						variant="sec"
						onClick={goBack}
						loading={false}
					>
						Back
					</BaseButton>
				</div>
				<div className="w-1/2">
					<BaseButton
						type="button"
						onClick={handleClick}
						loading={false}
						disabled={!gigTemplate.title}
					>
						Next
					</BaseButton>
				</div>
			</div>

			{open && (
				<GigInformationModal
					open={open}
					handleClose={() => setOpen(false)}
					form={{}}
					handleForm={handleForm}
					handleTemplate={(arg) => setGigTemplate(arg)}
				/>
			)}
		</div>
	);
}

GigInformation.propTypes = {
	handleForm: PropTypes.func.isRequired,
	gotoNextStep: PropTypes.func.isRequired, // Proper usage of PropTypes
	goBack: PropTypes.func,
};
