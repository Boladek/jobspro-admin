import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";
import { BaseSelect } from "../../../../../component/select";
import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { Switch } from "../../../../../component/switch";

export function PaymentMode({ goBack }) {
	return (
		<div>
			<div className="flex gap-2 items-center mb-4">
				<span onClick={goBack}>
					<FaArrowLeft className="text-xl" />
				</span>
				<span className="p-2 rounded-full text-xs bg-[#F1F2FF] text-[#3F0799]">
					Payment Mode
				</span>
			</div>

			<div className="border-t py-8 grid grid-cols-1 gap-4">
				<div className="p-4 rounded-md border bg-[#FFFAEF]">
					<p className="text-xs font-bold mb-2">Note</p>
					<p className="text-tiny mb">
						You can choose to make payments manual or automatic, be switching
						the toggle,, all the best
					</p>
				</div>

				<div>
					<BaseSelect label="Select Country">
						<option>All</option>
					</BaseSelect>
				</div>

				<div className="grid grid-cols-1 gap-4 pt-8">
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-1/3">
							<p className="text-xs font-bold">Make payments manual</p>
							<div className="w-12">
								<ProgressBar color="#FF7A00" />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={true}
								color="#0FFF9A"
								handleChecked={() => null}
							/>
							<div className="font-bold">
								ON
							</div>
						</div>
					</div>
					<div
						className="flex p-4 rounded-md border items-center gap-1"
						// onClick={() => setStep(2)}
					>
						<div className="w-1/3">
							<p className="text-xs font-bold">Make payments manual</p>
							<div className="w-12">
								<ProgressBar color="#FF7A00" />
							</div>
						</div>
						<div className="flex-1 text-tiny"></div>
						<div className="w-1/6 flex gap-4 items-center">
							<Switch
								checked={false}
								color="#0FFF9A"
								handleChecked={() => null}
							/>
							<div className="font-bold">
								OFF
							</div>
						</div>
					</div>
				</div>

				{/* <div className="flex gap-4">
					{["VFD", "Sterling", "BOA", "Lloyds"].map((item) => (
						<div
							key={item}
							className="p-4 border rounded-md w-28 flex flex-col items-center gap-2"
							htmlFor={item}
							onClick={() => handleSelect(item)}
						>
							<p className="text-xs/tight font-bold">{item}</p>
							<div className="w-2/3">
								<ProgressBar color="#FF7A00" />
							</div>
							<div
								className={`w-5 h-5 rounded-full ${
									selected.includes(item) ? "bg-white" : "bg-gray-300"
								}`}
							>
								{selected.includes(item) && (
									<IoMdCheckmarkCircle className="text-2xl text-green-500" />
								)}
							</div>
						</div>
					))}
				</div> */}
			</div>
		</div>
	);
}

PaymentMode.propTypes = {
	goBack: PropTypes.func,
};
