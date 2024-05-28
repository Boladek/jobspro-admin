import { useState } from "react";
import { Modal } from "../../../component/modal";
// import { BaseButton } from "../../../component/button";
// import education from "../../../assets/education-experience.png";
// import { colors } from "../helpers/theme";
import { BaseInput } from "../../../component/input";
import PropTypes from "prop-types";
import { BaseSelect } from "../../../component/select";

export function AddUserModal({ open, handleClose }) {
	const [skills, setSkills] = useState([]);
	const [text, setText] = useState("");

	const handleKeyPress = (event) => {
		const { value } = event.target;
		if (event.key === "Enter") {
			// alert("Enter key pressed!");
			setSkills((prev) => [...prev, value]);
			setText("");
		}
	};

	const deleteSkill = (skill) => {
		setSkills((prev) => prev.filter((item) => item !== skill));
	};

	return (
		<Modal open={open} handleClose={handleClose} maxWidth={750}>
			<form className="w-full p-2">
				<p className={`font-bold text-primary`}>Onboard New User</p>
				<br />
				<div>
					<p className="text-adminPrimary font-bold">Bio</p>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseInput label="FirstName" />
						</div>
						<div className="flex-1">
							<BaseInput label="LastName" />
						</div>
					</div>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseSelect label="Country">
								<option></option>
							</BaseSelect>
						</div>
						<div className="flex-1">
							<BaseInput label="Phone Number" placeholder="+2348080183735" />
						</div>
						<div className="flex-1">
							<BaseSelect label="Gender">
								<option></option>
							</BaseSelect>
						</div>
					</div>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseInput label="Email" />
						</div>
						<div className="flex-1">
							<BaseInput label="Password" />
						</div>
						<div className="flex-1">
							<BaseInput label="Confirm Password" />
						</div>
					</div>
				</div>
				<div>
					<p className="text-adminPrimary font-bold">Profession</p>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseInput label="Title" />
						</div>
						<div className="flex-1">
							<BaseInput label="Years of Experience" type="number" />
						</div>
						<div className="flex-1 flex gap-2">
							<div className="flex-1">
								<BaseInput label="Rate" type="number" />
							</div>
							<div className="flex-2">
								<BaseSelect label="Period">
									<option>Hourly</option>
									<option>Daily</option>
								</BaseSelect>
							</div>
						</div>
					</div>
					<p>Skills</p>
					<div className="flex gap-3 mb-4 items-center flex-wrap">
						<div className="w-48">
							<BaseInput
								placeholder="Enter Skill"
								onKeyPress={handleKeyPress}
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
						</div>
						{skills &&
							skills.map((item) => (
								<div
									key={item}
									className="border py-2 px-4 rounded-full flex gap-2 items-center text-adminPrimary text-xs border-adminPrimary"
								>
									<span>{item}</span>
									<span
										onClick={() => deleteSkill(item)}
										className="p-1 cursor-pointer"
									>
										&#x2716;
									</span>
								</div>
							))}
					</div>
					<div className="flex gap-3 mb-4">
						<div className="flex-1">
							<BaseInput label="Email" />
						</div>
						<div className="flex-1">
							<BaseInput label="Password" />
						</div>
						<div className="flex-1">
							<BaseInput label="Confirm Password" />
						</div>
					</div>
				</div>
			</form>
		</Modal>
	);
}

AddUserModal.propTypes = {
	open: PropTypes.bool.isRequired,
	form: PropTypes.object,
	handleClose: PropTypes.func.isRequired, // Proper usage of PropTypes
};
