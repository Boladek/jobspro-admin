import PropTypes from "prop-types";
import { useState } from "react";
import { BaseButton } from "../../../component/button";
import { GigLocation } from "./gig-location";
import { DeleteIcon } from "../../../assets/delete-icon";
import { EditIcon } from "../../../assets/edit-icon";
import { useQuery } from "@tanstack/react-query";
import profileAxios from "../../../helpers/profileAxios";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEditLocationAlt } from "react-icons/md";
// import { LocationIcon } from "../../../assets/admin/location-icon";

const tabs = ["Yes, In-Person", "No, Virtual"];

export function GigAddress({ handleForm, gotoNextStep, form }) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("");
	const [address, setAddress] = useState({});
	const [save, setSave] = useState(false);

	function handleAccount(acct) {
		setSelected(acct);
	}

	// const { data, isLoading, refetch } = useQuery({
	// 	queryKey: ["gig-address"],
	// 	queryFn: () => profileAxios.get(`/gigs/saved-address`),
	// 	select: (data) => data,
	// 	staleTime: Infinity,
	// });

	// console.log({ data });

	const handleClick = () => {
		const formData = {
			isPhysical: selected === "Yes, In-Person",
			longitude: address.lng,
			latitude: address.lat,
			address: address.address,
			isAddressSaved: save,
		};
		handleForm(formData);
		gotoNextStep();
	};

	return (
		<div className="max-w-screen-sm mx-auto bg-white rounded-md h-full">
			<div className="grid grid-cols-1 gap-4">
				<p className="text-center text-sm text-gray-500">
					Do you require the Pro to be present in person to complete this Gig?
				</p>
				<div className="flex gap-3 w-full max-w-sm mx-auto">
					{tabs.map((item) => (
						<div
							key={item}
							onClick={() => handleAccount(item)}
							className={`capitalize p-3 px-4 border border-secondary text-sm text-primary rounded-full text-center hover:bg-secondary hover:text-white cursor-pointer font-bold w-1/2 ${
								item === selected ? "bg-primary text-white" : ""
							}`}
						>
							{item}
						</div>
					))}
				</div>
				{address.lat && (
					<div className="py-4 max-w-sm mx-auto ">
						<div className="flex gap-2">
							<div
								className={`border border-primary p-4 rounded-lg flex gap-2 items-center flex-1`}
							>
								<IoLocationSharp className="text-primary text-2xl" />
								<div className="text-sm">{address.address}</div>
							</div>
							<div className="flex flex-col gap-1 justify-center items-center text-xl">
								<span>
									<MdEditLocationAlt
										onClick={() => setOpen(true)}
										className="cursor-pointer hover:opacity-70 text-primary"
									/>
								</span>
								<span>
									<RiDeleteBin6Line className="text-red-500 cursor-pointer hover:opacity-70" />
								</span>
							</div>
						</div>
						<div className="flex gap-2 p-2 items-center">
							<input
								id="address"
								type="checkbox"
								value="yes"
								onChange={(e) => setSave(e.target.checked)}
							/>
							<label htmlFor="address" className="text-sm">
								Save gig Address
							</label>
						</div>
					</div>
				)}
				{selected && !address.lat && (
					<div className="py-4 max-w-sm mx-auto w-full">
						<div
							onClick={() => setOpen(true)}
							className="p-3 border border-dashed border-primary text-center rounded-full w-full text-sm hover:text-secondary text-primary font-bold cursor-pointer hover:bg-gray-100 mx-auto"
						>
							Add Address &#43;
						</div>
					</div>
				)}
				{selected && address.lat && (
					<div className="flex justify-center gap-2 mt-4">
						<div className="w-1/4">
							<BaseButton type="button" variant="sec" loading={false}>
								Back
							</BaseButton>
						</div>
						<div className="w-1/4">
							<BaseButton type="submit" onClick={handleClick} loading={false}>
								Next
							</BaseButton>
						</div>
					</div>
				)}
			</div>

			{open && (
				<GigLocation
					open={open}
					handleClose={() => setOpen(false)}
					handleAddress={(arg) => {
						setAddress(arg);
					}}
				/>
			)}
		</div>
	);
}

GigAddress.propTypes = {
	handleForm: PropTypes.func.isRequired,
	gotoNextStep: PropTypes.func.isRequired, // Proper usage of PropTypes
	form: PropTypes.object,
};
