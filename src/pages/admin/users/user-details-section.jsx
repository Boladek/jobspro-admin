import { useMemo } from "react";
import avatar from "../../../assets/profile-avatar.png";
import { ProgressBar } from "../../../component/admin/progress-bar";
import { useParams } from "react-router-dom";
import { formatDate, formatNumber, isEmpty } from "../../../helpers/function";
import { UseUserDetails } from "./admin-user-details-page";

export function UserDetailsSection() {
    const { userId } = useParams();
    const { userDetails, gettingUserDetails } = UseUserDetails();

    const accountName = useMemo(() => {
        if (userDetails && !isEmpty(userDetails)) {
            const name =
                userDetails.userType !== "business"
                    ? `${userDetails.firstName} ${userDetails.lastName}`
                    : userDetails.companyName;
            return name;
        }
    }, [userDetails]);

    return (
        <>
            {gettingUserDetails ? (
                <div>Please wait ...</div>
            ) : (
                <div className="rounded-t-lg border rounded-b-lg">
                    <div className="bg-[#F6F4FD] p-4 pt-6 flex justify-between items-center rounded-t-lg border-b">
                        <div className="flex gap-2 items-center">
                            <img
                                src={userDetails?.profilePicture ?? avatar}
                                className="h-10 w-10"
                            />
                            <div className="text-xs">
                                <p className="text-[#3514FF] font-bold">
                                    {accountName}
                                </p>
                                {/* <p className="text-gray-600">Nail Technician</p> */}
                            </div>
                        </div>
                        <div>
                            <span className="p-2 px-6 rounded-full border border-[#3514FF] text-[#3514FF] text-xs font-bold">
                                Tier 1
                            </span>
                        </div>
                    </div>
                    <div className="p-4 border-b">
                        <div className="flex justify-between mb-4 gap-4">
                            <div className="flex-1">
                                <p className="text-tiny text-gray-400">
                                    Finclusion ID
                                </p>
                                <p className="text-xs font-bold">{userId}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-tiny text-gray-400">Email</p>
                                <p className="text-xs font-bold">
                                    {userDetails?.email}
                                </p>
                            </div>
                            <div className="flex-1">
                                <p className="text-tiny text-gray-400">Phone</p>
                                <p className="text-xs font-bold">
                                    {userDetails?.phone || "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center w-full gap-4">
                            <div className="p-3 px-6 rounded-md text-xs text-[#3514FF] bg-[#E9E5FF] font-bold">
                                Message
                            </div>
                            {/* <div className="border p-3 px-6 rounded-md text-xs relative font-bold">
                Dispute
                <span className="absolute -top-3 -right-1 p-1 px-2 rounded-sm text-tiny bg-[#FFDE16] font-bold">
                  4
                </span>
              </div> */}
                            <div className="border p-3 px-4 rounded-md border-[#3514FF]">
                                <p className="text-xs text-[#3514FF]">Wallet</p>
                                <div className="w-6">
                                    <ProgressBar color="#0FFF9A" />
                                </div>
                                <div>
                                    <span className="text-xs">NGN</span>{" "}
                                    <span className="text-lg text-[#3514FF] font-bold">
                                        {formatNumber(
                                            userDetails?.walletAmount,
                                            2
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b p-4">
                        <p className="text-xs font-bold">Bio</p>
                        <div className="text-tiny">
                            {userDetails.about ?? "Not Available"}
                        </div>
                    </div>
                    <div className="border-b p-4">
                        <div className="text-xs font-bold mb-2">Experience</div>
                        {userDetails.userExperiences.length > 0 ? (
                            userDetails.userExperiences.map((exp) => (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[#3514FF] bg-[#E9E5FF] p-1 px-4 text-tiny font-bold rounded-md">
                                            {exp.workplace} - {exp.role}
                                        </span>
                                        <div className="text-tiny">
                                            <div>
                                                {formatDate(exp.startDate)} -{" "}
                                                {exp.stillWorkingHere
                                                    ? "Present"
                                                    : formatDate(exp.endDate)}
                                            </div>
                                            <div className="w-7">
                                                <ProgressBar
                                                    color="#212121"
                                                    thickness={0.5}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-tiny">
                                        {exp.description || "Not available"}
                                    </div>
                                </>
                            ))
                        ) : (
                            <p className="text-tiny">Not Available</p>
                        )}
                    </div>
                    <div className="border-b p-4 rounded-b-lg">
                        <p className="text-xs font-bold mb-4">Skills</p>
                        <div className="text-tiny flex gap-4">
                            {userDetails?.userSkillSets.length > 0 ? (
                                userDetails?.userSkillSets?.map((item) => (
                                    <span
                                        key={item.uuid}
                                        className="py-1 px-4 border rounded-full font-semibold text-[#3514FF] bg-[#E9E5FF]"
                                    >
                                        {item.skill}
                                    </span>
                                ))
                            ) : (
                                <p>Not Available</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
