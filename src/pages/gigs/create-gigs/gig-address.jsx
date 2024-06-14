import PropTypes from "prop-types";
import { useState } from "react";
import { BaseButton } from "../../../component/button";
import { GigLocation } from "./gig-location";
import { DeleteIcon } from "../../../assets/delete-icon";
import { EditIcon } from "../../../assets/edit-icon";

const tabs = ["Yes, In-Person", "No, Virtual"];

export function GigAddress({ handleForm, gotoNextStep, form }) {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState("");
	const [address, setAddress] = useState({});
	const [save, setSave] = useState(false);

	function handleAccount(acct) {
		setSelected(acct);
	}

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
		<div className="max-w-screen-sm mx-auto m-2 bg-white rounded-md h-full">
			<div>
				<p className="text-center mb-2 text-sm text-gray-500">
					Do you require the Pro to be present in person to complete this Gig?
				</p>
				<div className="flex gap-3 mx-auto w-fit">
					{tabs.map((item) => (
						<div
							key={item}
							onClick={() => handleAccount(item)}
							className={`capitalize p-3 px-4 border-2 border-secondary text-sm text-primary rounded-full text-center hover:bg-secondary hover:text-white cursor-pointer font-bold w-fit ${
								item === selected ? "bg-primary text-white" : ""
							}`}
						>
							{item}
						</div>
					))}
				</div>
				{address.lat && (
					<div className="py-4 max-w-sm mx-auto ">
						<>
							<div className="flex gap-2">
								<div className={`border p-3 rounded-lg flex-1`}>
									<p className="text-sm">{address.address}</p>
								</div>
								<div className="flex flex-col gap-1 justify-center">
									<span onClick={() => setOpen(true)}>
										<EditIcon size={0.75} />
									</span>
									<span>
										<DeleteIcon size={0.75} />
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
						</>
					</div>
				)}
				{selected && !address.lat && (
					<div className="py-4">
						<div
							onClick={() => setOpen(true)}
							className="p-3  border rounded-full w-fit text-sm hover:text-secondary text-primary font-bold cursor-pointer hover:bg-gray-100 mx-auto"
						>
							Add Address &#43;
						</div>
					</div>
				)}
			</div>
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
