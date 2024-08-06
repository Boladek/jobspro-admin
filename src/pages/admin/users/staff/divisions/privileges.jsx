import PropTypes from "prop-types";
import { generateArray } from "../../../../../helpers/function";
import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { IoPerson } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { BaseInput } from "../../../../../component/input";
import { useForm } from "react-hook-form";
import { BaseSelect } from "../../../../../component/select";
import { SquareButton } from "../../../../../component/square-button";
import { TiDelete } from "react-icons/ti";
import { SideWrapper } from "../../../../../component/side-wrapper";

export function Privileges() {
	const [open, setOpen] = useState(false);

	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="p-3 border flex justify-between bg-[#E9E5FF] items-center rounded-md border-[#8851FF]">
				<div className="flex items-center gap-2">
					<div className="w-12 h-12 rounded-md bg-white flex items-center justify-center">
						<IoPerson className="text-3xl" />
					</div>
					<div>
						<p className="font-bold text-xs mb-0.5">Privileges</p>
						<div>
							<ProgressBar thickness={1.2} color="#3677FF" />
						</div>
					</div>
				</div>
				<div className="text-sm font-bold">23 Privileges</div>
				<div>
					<span
						className="p-2 border border-[#667085] rounded-full text-xs font-light flex gap-2 items-center cursor-pointer"
						onClick={() => setOpen(true)}
					>
						Add Privileges
						<FaPlus className="text-md" />
					</span>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-4">
				{generateArray(3).map(() => (
					<PrivilegeCard key={Math.random()} />
				))}
			</div>

			{open && <AddPrivilegePopup handleClose={() => setOpen(false)} />}
		</div>
	);
}

function PrivilegeCard() {
	const [open, setOpen] = useState(false);

	return (
		<div className="p-4 border border-[#025949] rounded-md grid grid-cols-1 gap-4">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 rounded-md bg-[#8851FF] text-white flex items-center justify-center">
						FD
					</div>
					<div>
						<p className="font-bold text-tiny mb-0.5">Department</p>
						<div className="w-4 mb-0.5">
							<ProgressBar thickness={0.25} color="#8851FF" />
						</div>
						<p className="text-tiny">Customer Care Rep.</p>
					</div>
				</div>
				<div>
					<span className="p-1.5 px-4 border border-[#8851FF] rounded-full text-xs font-bold flex gap-2 items-center cursor-pointer text-[#8851FF]">
						Add Role
						<FaPlus className="text-md" />
					</span>
				</div>
			</div>
			<div>
				<p className="font-bold text-xs">Customer</p>
				<p className="text-xs font-light">All Access</p>
			</div>
			<div className="flex justify-between items-center">
				<div>
					<div className="mb-0.5 flex justify-between text-xs">
						<span className="font-light text-tiny">Members</span>
						<span className="font-bold">25</span>
					</div>
					<div className="w-20">
						<ProgressBar thickness={1.2} color="#8851FF" />
					</div>
				</div>
				<div
					className="text-xs font-semibold cursor-pointer"
					onClick={() => setOpen(true)}
				>
					View
				</div>
			</div>

			{open && <UpdatePrivilegePopup handleClose={() => setOpen(false)} />}
		</div>
	);
}

function AddPrivilegePopup({ handleClose }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<SideWrapper title="Add Privilege" handleClose={handleClose}>
			<div className="w-[450px]">
				<div className="flex p-4 rounded-md border items-center gap-1 mb-4">
					<div className="w-1/3">
						<p className="text-tiny font-bold">Privilege Configuration</p>
						<div className="w-12">
							<ProgressBar color="#FF7A00" />
						</div>
					</div>
					<div className="flex-1 text-tiny">Role name will display here</div>
					<div className="w-1/12"></div>
				</div>

				<form
					className="grid grid-cols-1 gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<BaseInput
							label="Privilege Name"
							{...register(`privilegeName`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.privilegeName}
							errorText={errors.privilegeName && errors.privilegeName.message}
						/>
					</div>
					<div>
						<BaseSelect
							label="Access List"
							{...register(`accessList`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.accessList}
							errorText={errors.accessList && errors.accessList.message}
						>
							<option></option>
						</BaseSelect>
					</div>
					<div>
						<BaseSelect
							label="Role"
							{...register(`role`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.role}
							errorText={errors.role && errors.role.message}
						>
							<option></option>
						</BaseSelect>
					</div>
					<div className="pt-4">
						<SquareButton>Create Privilege</SquareButton>
					</div>
				</form>
			</div>
		</SideWrapper>
	);
}

AddPrivilegePopup.propTypes = {
	handleClose: PropTypes.func,
};

function UpdatePrivilegePopup({ handleClose }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<SideWrapper title="Update Privilege" handleClose={handleClose}>
			<div className="w-[450px] pr-4">
				<div className="flex p-4 rounded-md border items-center gap-1 mb-4">
					<div className="w-1/3">
						<p className="text-tiny font-bold">Role Configuration</p>
						<div className="w-12">
							<ProgressBar color="#FF7A00" />
						</div>
					</div>
					<div className="flex-1 text-tiny">Customer Care Representative</div>
					<div className="w-1/12"></div>
				</div>

				<form
					className="grid grid-cols-1 gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="bg-[#025949] p-4 rounded-md">
						<div className="w-fit p-1 px-6 bg-[#FFDE16] text-[#025949] text-xs rounded-md font-bold mb-6">
							Jobs Pro Customer Care Rep
						</div>
						<div className="flex gap-4">
							<div className="text-white text-xs w-1/3">
								<p className="font-extralight">Department</p>
								<div className="w-6">
									<ProgressBar color="#0FFF9A" thickness={0.25} />
								</div>
								<p className="font-bold">Customer Care</p>
							</div>
							<div className="text-white text-xs w-1/3">
								<p className="font-extralight">Members</p>
								<div className="w-6">
									<ProgressBar color="#0FFF9A" thickness={0.25} />
								</div>
								<p className="font-bold">40</p>
							</div>
							<div className="text-white text-xs w-1/3">
								<p className="font-extralight">Roles</p>
								<div className="w-6">
									<ProgressBar color="#0FFF9A" thickness={0.25} />
								</div>
								<p className="font-bold">4</p>
							</div>
						</div>
					</div>
					<div>
						<BaseInput
							label="Privilege Name"
							{...register(`privilegename`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.privilegename}
							errorText={errors.privilegename && errors.privilegename.message}
						/>
					</div>
					<div>
						<BaseSelect
							label="Access Group"
							{...register(`accessGroup`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.accessGroup}
							errorText={errors.accessGroup && errors.accessGroup.message}
						>
							<option></option>
						</BaseSelect>
					</div>
					<div>
						<BaseSelect
							label="Access List"
							{...register(`accessList`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.accessList}
							errorText={errors.accessList && errors.accessList.message}
						>
							<option></option>
						</BaseSelect>
					</div>
					<div>
						<BaseSelect
							label="Role"
							{...register(`role`, {
								required: "This field is required",
								setValueAs: (v) => v.trim(),
							})}
							error={errors.role}
							errorText={errors.role && errors.role.message}
						>
							<option></option>
						</BaseSelect>
						<div className="flex gap-4 flex-wrap pt-2">
							<div className="flex gap-1 items-center border rounded-full bg-[#E7E2FF] p-2 border-[#3F0799] text-[#3F0799] w-fit text-xs font-semibold">
								Financial All Access
								<TiDelete className="text-gray-400 text-xl" />
							</div>
						</div>
					</div>
					<div className="pt-4">
						<SquareButton>Update Role</SquareButton>
					</div>
				</form>
			</div>
		</SideWrapper>
	);
}

UpdatePrivilegePopup.propTypes = {
	handleClose: PropTypes.func,
};
