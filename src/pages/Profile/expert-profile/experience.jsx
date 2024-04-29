/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { colors } from "../../../helpers/theme";
import { BaseButton } from "../../../component/button";
import info from "../../../assets/info.png";
import { WorkExperienceModal } from "../../../component/work-experience-modal";
import PropTypes from "prop-types";
import edit from "../../../assets/edit-icon.png";
import add from "../../../assets/add.png";
import deleteIcon from "../../../assets/delete-icon.png";

const experiences = [
	{
		title: "Title",
		companyName: "Company Name",
		endDate: null,
		startDate: "2024-01-01",
		city: "City",
		country: "Country",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae facilis placeat similique consequuntur, minima earum aspernatur accusantium vitae odio incidunt molestias velit asperiores odit fuga iure consequatur aut autem officiis.",
		imgaes: [1, 2, 3],
	},
];

export function Experience() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [selected, setSelected] = useState(null);
	const [files, setFiles] = useState([]);

	const onSubmit = (data) => {
		console.log({ data });
	};

	const handleEdit = () => {
		setOpenEdit(true);
	};

	return (
		<div
			className="p-4 h-full flex flex-col"
			style={{ maxWidth: 500, width: "100%" }}
		>
			<div className="flex-1 md:flex md:justify-center md:items-center">
				<div>
					<div className="flex gap-1 items-center border rounded-md p-2 mb-4">
						<img src={info} alt="Information" />
						<div className="w-4/5 text-xs text-gray-500">
							Based on your industry of specialization you have to provide the
							following information
						</div>
					</div>
					<p className={`text-primary text-3xl font-bold`}>Add Experience</p>
					<p className="text-sm text-gray-500 mb-4">
						More information should be placed here
					</p>
					<div className="border-t border-b border-gray-300 py-2">
						{experiences.map((experience) => (
							<div key={experience.description}>
								<p className="font-bold text-lg">{experience.title}</p>
								<p className="text-gray-400 text-base">
									{experience.companyName} ({experience.startDate} -{" "}
									{experience.endDate || "Present"})
								</p>
								<p className="text-xs uppercase text-gray-700">
									{experience.city}, {experience.country}
								</p>
								<p className="text-xs text-gray-700">
									{experience.description}
								</p>
								<div className="flex">
									{experience.imgaes.map((image, index) => (
										<div
											key={image}
											style={{
												zIndex: index + 2,
												marginLeft: index > 0 ? "-0.5rem" : "0",
												backgroundColor: "#fff",
											}}
											className="rounded-md border-2 border-white"
										>
											<img src={info} className="h-8" />
										</div>
									))}
								</div>
								<div className="flex justify-end items-center gap-2 text-xs">
									<img src={edit} className="h-6" />{" "}
									<img src={deleteIcon} className="h-6" />
								</div>
							</div>
						))}
					</div>
					<div
						onClick={() => setOpen(true)}
						className="flex items-center gap-2 text-gray-500 p-6 mb-2 cursor-pointer"
					>
						<span className="p-2 bg-blue-100 rounded-full">
							<img src={add} className="h-5" />
						</span>
						<span className="underline">Add Experience</span>
					</div>
				</div>
			</div>
			<div className="flex justify-end gap-2">
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" variant="sec" loading={false}>
						Previous
					</BaseButton>
				</div>
				<div className="w-1/2 md:w-1/4">
					<BaseButton type="button" loading={false}>
						Next
					</BaseButton>
				</div>
			</div>

			{open && (
				<WorkExperienceModal open={open} handleClose={() => setOpen(false)} />
			)}

			{openEdit && (
				<WorkExperienceModal
					open={open}
					handleClose={() => setOpenEdit(false)}
					form={selected}
				/>
			)}
		</div>
	);
}

Experience.propTypes = {
	gotoNext: PropTypes.func,
	gotoPrevious: PropTypes.func, // Proper usage of PropTypes
};
