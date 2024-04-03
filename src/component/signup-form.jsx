import React from "react";

export function SignUpForm() {
	return (
		<form style={{ maxWidth: 400, width: "100%" }} className="p-4 shadow-lg">
			<p className="text-2xl text-[#206DB0] font-bold">Sign up to a find gig</p>
			<p className="text-xs text-gray-500 mb-2">Let’s get to know you better</p>
			<div className="flex flex-col gap-2">
				<div>
					<BaseInput
						error={true}
						errorText="This field is required"
						label="First Name"
						id="firstName"
					/>
				</div>
				<div>
					<BaseInput label="Last Name" id="lastName" />
				</div>
				<div>
					<BaseInput label="Email" id="email" />
				</div>
				<div>
					<BaseSelect label="Select Option" id="select">
						{options.map((item) => (
							<option className="text-sm">{item}</option>
						))}
					</BaseSelect>
				</div>
				<div>
					<BaseButton>Submit</BaseButton>
				</div>
			</div>
		</form>
	);
}
