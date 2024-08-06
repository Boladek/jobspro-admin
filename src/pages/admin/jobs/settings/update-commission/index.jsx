import { FaArrowLeft } from "react-icons/fa6";
import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { Switch } from "../../../../../component/switch";
import { UseCommission } from "../../../../../context/commission-context";
import { useState } from "react";
import { BaseSelect } from "../../../../../component/select";
import { BaseInput } from "../../../../../component/input";
import { SquareButton } from "../../../../../component/square-button";

export function UpdateCommission() {
	const { handleStep } = UseCommission();
	const [openGlobal, setOpenGlobal] = useState(false);
	const [openContinent, setOpenContinent] = useState(false);
	const [openCountry, setOpenCountry] = useState(false);
	const [openRegion, setOpenRegion] = useState(false);
	const [openDefault, setOpenDefault] = useState(false);

	return (
		<div>
			<div className="flex gap-2 items-center mb-4">
				<span onClick={() => handleStep(1)}>
					<FaArrowLeft className="text-xl" />
				</span>
				<span className="p-2 rounded-full text-xs bg-[#F1F2FF] text-[#3F0799]">
					Update Commissions Category
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 pt-8">
				<div>
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-2/3">
							<p className="text-xs font-bold mb-0.5">
								Apply configuration globally
							</p>
							<div className="w-12">
								<ProgressBar color={openGlobal ? "#8851FF" : "#FF7A00"} />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={openGlobal}
								color="#0FFF9A"
								handleChecked={() => setOpenGlobal((prev) => !prev)}
							/>
							<div className="font-bold">{openGlobal ? "ON" : "OFF"} </div>
						</div>
					</div>
					{openGlobal && (
						<div className="grid grid-cols-1 gap-4 py-4">
							<div>
								<BaseSelect label="Select Industry">
									<option>All</option>
								</BaseSelect>
							</div>
							<div className="relative">
								<span className="absolute left-4" style={{ top: "2.45rem" }}>
									%
								</span>
								<BaseInput
									label="Commission Rate"
									type="number"
									style={{ paddingLeft: "2rem" }}
								/>
							</div>
						</div>
					)}
				</div>

				<div>
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-2/3">
							<p className="text-xs font-bold mb-0.5">
								Apply configuration based on continent
							</p>
							<div className="w-12">
								<ProgressBar color={openContinent ? "#8851FF" : "#FF7A00"} />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={openContinent}
								color="#0FFF9A"
								handleChecked={() => setOpenContinent((prev) => !prev)}
							/>
							<div className="font-bold">{openContinent ? "ON" : "OFF"} </div>
						</div>
					</div>
					{openContinent && (
						<div className="grid grid-cols-1 gap-4 py-4">
							<div>
								<BaseSelect label="Select Continent">
									<option>All</option>
								</BaseSelect>
							</div>
							<div>
								<BaseSelect label="Select Industry">
									<option>All</option>
								</BaseSelect>
							</div>
							<div className="relative">
								<span className="absolute left-4" style={{ top: "2.45rem" }}>
									%
								</span>
								<BaseInput
									label="Commission Rate"
									type="number"
									style={{ paddingLeft: "2rem" }}
								/>
							</div>
						</div>
					)}
				</div>

				<div>
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-2/3">
							<p className="text-xs font-bold mb-0.5">
								Apply configuration based on country
							</p>
							<div className="w-12">
								<ProgressBar color={openCountry ? "#8851FF" : "#FF7A00"} />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={openCountry}
								color="#0FFF9A"
								handleChecked={() => setOpenCountry((prev) => !prev)}
							/>
							<div className="font-bold">{openCountry ? "ON" : "OFF"} </div>
						</div>
					</div>
					{openCountry && (
						<div className="grid grid-cols-1 gap-4 py-4">
							<div>
								<BaseSelect label="Select Country">
									<option>All</option>
								</BaseSelect>
							</div>
							<div>
								<BaseSelect label="Select Industry">
									<option>All</option>
								</BaseSelect>
							</div>
							<div className="relative">
								<span className="absolute left-4" style={{ top: "2.45rem" }}>
									%
								</span>
								<BaseInput
									label="Commission Rate"
									type="number"
									style={{ paddingLeft: "2rem" }}
								/>
							</div>
						</div>
					)}
				</div>

				<div>
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-2/3">
							<p className="text-xs font-bold mb-0.5">
								Apply configuration based on region
							</p>
							<div className="w-12">
								<ProgressBar color={openRegion ? "#8851FF" : "#FF7A00"} />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={openRegion}
								color="#0FFF9A"
								handleChecked={() => setOpenRegion((prev) => !prev)}
							/>
							<div className="font-bold">{openRegion ? "ON" : "OFF"} </div>
						</div>
					</div>
					{openRegion && (
						<div className="grid grid-cols-1 gap-4 py-4">
							<div>
								<BaseSelect label="Select Country">
									<option>All</option>
								</BaseSelect>
							</div>
							<div>
								<BaseSelect label="Select Region">
									<option>All</option>
								</BaseSelect>
							</div>
							<div>
								<BaseSelect label="Select Industry">
									<option>All</option>
								</BaseSelect>
							</div>
							<div className="relative">
								<span className="absolute left-4" style={{ top: "2.45rem" }}>
									%
								</span>
								<BaseInput
									label="Commission Rate"
									type="number"
									style={{ paddingLeft: "2rem" }}
								/>
							</div>
						</div>
					)}
				</div>

				<div>
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-2/3">
							<p className="text-xs font-bold mb-0.5">Set Default</p>
							<div className="w-12">
								<ProgressBar color={openDefault ? "#8851FF" : "#FF7A00"} />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={openDefault}
								color="#0FFF9A"
								handleChecked={() => setOpenDefault((prev) => !prev)}
							/>
							<div className="font-bold">{openDefault ? "ON" : "OFF"} </div>
						</div>
					</div>
					{openDefault && (
						<div className="grid grid-cols-1 gap-4 py-4">
							<div className="relative">
								<span className="absolute left-4" style={{ top: "2.45rem" }}>
									%
								</span>
								<BaseInput
									label="Commission Rate"
									type="number"
									style={{ paddingLeft: "2rem" }}
								/>
							</div>
						</div>
					)}
				</div>

				<div className="mt-8">
					<SquareButton>Save Configuration</SquareButton>
				</div>
			</div>
		</div>
	);
}
