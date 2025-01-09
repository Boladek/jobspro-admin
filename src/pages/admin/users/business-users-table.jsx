import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "../../../assets/admin/star-icon";
import avatar from "../../../assets/profile-avatar.png";
import { formatNumber } from "../../../helpers/function";

export function BusinessUsersTable({ users }) {
    const navigate = useNavigate();
    console.log(users);
    return (
        <div className="overflow-x-auto max-h-[600px] min-h-[200px]">
            <table className="min-w-full table-auto text-sm relative">
                <thead className="sticky top-0 text-gray-600 bg-gray-200 text-[12px] font-[700]">
                    <tr>
                        <th
                            className="px-2 py-4 text-[12px] font-[600]"
                            align="left"
                        >
                            Company Name
                        </th>
                        <th
                            className="px-2 py-4 text-[12px] font-[600]"
                            align="left"
                        >
                            Jobs Done
                        </th>
                        <th
                            className="px-2 py-4 text-[12px] font-[600]"
                            align="left"
                        >
                            Rating
                        </th>
                        <th
                            className="px-2 py-4 text-[12px] font-[600]"
                            align="left"
                        >
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item) => (
                        <tr
                            key={item.uuid}
                            className="bg-[#fff] rounded-[8px] hover:bg-gray-100"
                            title="Click to see more user details"
                            onClick={() =>
                                navigate(`/admin/users/${item.finclusionId}`)
                            }
                        >
                            <td className="p-2 flex items-center gap-2 text-[12px]">
                                <img
                                    src={item.profilePicture ?? avatar}
                                    alt={item.companyName}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div className="capitalize text-[12px]">
                                    <p className="font-bold text-adminPrimary">
                                        {item.companyName}
                                    </p>
                                    <p className="font-extralight text-xs">
                                        {item.finclusionId}
                                    </p>
                                </div>
                            </td>
                            <td className="p-2 text-[12px]">
                                {formatNumber(item.completedGigsCount)}
                            </td>
                            <td className="p-2 text-[12px]">
                                <div className="flex gap-2 text-[12px]">
                                    <StarIcon />
                                    {formatNumber(item.rating, 2)}
                                </div>
                            </td>
                            <td className="p-2 text-[12px] capitalize">
                                {item.isUserDeactivated ? "inactive" : "active"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

BusinessUsersTable.propTypes = {
    users: PropTypes.array,
};
