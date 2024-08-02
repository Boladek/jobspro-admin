import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";
import { BaseSelect } from "../../../../../component/select";
import { ProgressBar } from "../../../../../component/admin/progress-bar";
import { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

export function PaymentPartners({ goBack }) {
	const [selected, setSelected] = useState([]);

	const handleSelect = (item) => {
		if (selected.includes(item)) {
			const newSelection = [...selected].filter((cont) => cont !== item);
			setSelected([...new Set(newSelection)]);
		} else {
			const newSelection = [...selected, item];
			setSelected([...new Set(newSelection)]);
		}
	};

	return (
		<div>
			<div className="flex gap-2 items-center mb-4">
				<span onClick={goBack}>
					<FaArrowLeft className="text-xl" />
				</span>
				<span className="p-2 rounded-full text-xs bg-[#F1F2FF] text-[#3F0799]">
					Payment Partners
				</span>
			</div>

			<div className="border-t py-8 grid grid-cols-1 gap-4">
				<div className="p-4 rounded-md border bg-[#FFFAEF]">
					<p className="text-xs font-bold mb-2">Note</p>
					<p className="text-tiny mb-1">
						Selecting a partner gives permission to the system to process
						payments through that partner, also deselecting a payment partner,
						authorizes the system to not perform payment transactions that said
						partner
					</p>
					<p className="text-tiny">
						Partners selected are marked green, while the deselected partner is
						grayed out
					</p>
				</div>

				<div>
					<BaseSelect label="Select Country">
						<option>All</option>
					</BaseSelect>
				</div>

				<div className="flex gap-4">
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
				</div>
			</div>
		</div>
	);
}

PaymentPartners.propTypes = {
	goBack: PropTypes.func,
};
