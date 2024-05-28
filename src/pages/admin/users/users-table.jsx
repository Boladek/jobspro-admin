import { useNavigate } from "react-router-dom";
import { StarIcon } from "../../../assets/admin/star-icon";
import avatar from "../../../assets/profile-avatar.png";

const data = [
	{
		name: "Bello Yusuf",
		profession: "Marketting Manager",
		country: "Nigeria",
		jobsDone: 55,
		ratings: "4.7",
		status: "active",
	},
	{
		name: "Ridwan Quadri",
		profession: "Sales Manager",
		country: "Nigeria",
		jobsDone: 1,
		ratings: "4.1",
		status: "active",
	},
	{
		name: "Ayodeji Fatai",
		profession: "Guide Specialist",
		country: "Nigeria",
		jobsDone: 22,
		ratings: "4.5",
		status: "active",
	},
	{
		name: "Rayo Hambolu",
		profession: "Engineering Product",
		country: "Nigeria",
		jobsDone: 100,
		ratings: "5.0",
		status: "active",
	},
	{
		name: "Adeyemo Ore",
		profession: "Product Manager",
		country: "Nigeria",
		jobsDone: 40,
		ratings: "4.9",
		status: "active",
	},
];

export function UsersTable() {
	const navigate = useNavigate();
	return (
		<table className="w-full table-auto text-sm rounded-tr-xl rounded-tl-xl overflow-hidden">
			<thead className="bg-light">
				<tr>
					<th className="px-2 py-3" align="left">
						Name
					</th>
					<th className="px-2 py-3" align="left">
						Profession
					</th>
					<th className="px-2 py-3" align="left">
						Country
					</th>
					<th className="px-2 py-3" align="left">
						Jobs Done
					</th>
					<th className="px-2 py-3" align="left">
						Rating
					</th>
					<th className="px-2 py-3" align="left">
						Status
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item) => (
					<tr
						key={item.name}
						className="border-b py-4 cursor-pointer"
						title="Click to see more user details"
						onClick={() => navigate(`/admin/users/${item.name}`)}
					>
						<td className="p-2 flex items-center gap-2">
							<img src={avatar} alt={item.name} className="h-10" />
							<div>
								<p className="font-bold text-adminPrimary">{item.name}</p>
								<p className="font-extralight text-xs">{item.name}</p>
							</div>
						</td>
						<td className="p-2">{item.profession}</td>
						<td className="p-2">{item.country}</td>
						<td className="p-2">{item.jobsDone}</td>
						<td className="p-2">
							<div className="flex gap-2">
								{item.ratings} <StarIcon />
							</div>
						</td>
						<td className="p-2 capitalize">{item.status}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
