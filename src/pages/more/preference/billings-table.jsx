import { formatDate } from "../../../helpers/function";

const data = [
	{
		date: "9/16/2023",
		description: "Quality-focused static data-warehouse",
		amount: "$0.62",
		ref: "5002355451834852",
	},
	{
		date: "8/24/2023",
		description: "Cloned real-time intranet",
		amount: "$0.07",
		ref: "5002351454418736",
	},
	{
		date: "12/14/2023",
		description: "Multi-layered asymmetric circuit",
		amount: "$3.81",
		ref: "5007665048951505",
	},
	{
		date: "3/31/2024",
		description: "Sharable explicit software",
		amount: "$9.08",
		ref: "5002359149487701",
	},
	{
		date: "9/20/2023",
		description: "Programmable 3rd generation matrices",
		amount: "$1.32",
		ref: "5010129250988528",
	},
	{
		date: "3/11/2024",
		description: "Extended human-resource focus group",
		amount: "$4.28",
		ref: "5002352726362793",
	},
	{
		date: "10/26/2023",
		description: "Devolved 3rd generation forecast",
		amount: "$8.99",
		ref: "5007662233672046",
	},
	{
		date: "4/25/2024",
		description: "Integrated multimedia system engine",
		amount: "$6.12",
		ref: "5010125846171876",
	},
	{
		date: "8/23/2023",
		description: "Organized maximized process improvement",
		amount: "$6.04",
		ref: "5007663534226730",
	},
	{
		date: "9/11/2023",
		description: "Organized holistic conglomeration",
		amount: "$1.32",
		ref: "5010128251025538",
	},
];

export function BillingsTable() {
	return (
		<>
			<table className="hidden sm:table table-auto border-collapse w-full rounded-xl overflow-hidden border border-slate-400">
				<thead className="bg-light text-sm">
					<tr>
						<th className="p-4" align="left">
							Date
						</th>
						<th className="p-4 " align="left">
							Description
						</th>
						<th className="p-4 " align="left">
							Amount
						</th>
						<th className="p-4 " align="left">
							Ref ID
						</th>
					</tr>
				</thead>
				<tbody className="text-sm">
					{data.map((item) => (
						<tr key={item.ref} className="border-b border-b-gray-200">
							<td className="p-4">{formatDate(item.date)}</td>
							<td className="p-4">{item.description}</td>
							<td className="p-4">{item.amount}</td>
							<td className="p-4">{item.ref}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="sm:hidden">
				{data.map((item) => (
					<div
						key={item.ref}
						className="p-2 border shadow-sm rounded-xl flex justify-between mb-2"
					>
						<div className="w-4/6 text-xs">
							<p>{item.description}</p>
							<p>{formatDate(item.date)}</p>
						</div>
						<div className="w-2/6 text-right">
							<p className="text-sm font-bold">{item.amount}</p>
							<p className="text-[8px]">{item.ref}</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
