import { useMemo, useState } from "react";
// import { Calendar } from "../landing-page/calendar";
import { DashboardIcon } from "../../../assets/admin/dashboard-icon";
import { DocIcon } from "../../../assets/admin/doc-icon";
import { BaseInput } from "../../../component/input";
import { UsersTable } from "./users-table";
import { AddUserModal } from "./add-user-modal";
// import { DateHook } from "../../../hooks/date-hook";
import { UsersHook } from "../../../hooks/users-hook";
import { BusinessUsersHook } from "../../../hooks/business-users-hook";
import { BusinessUsersTable } from "./business-users-table";
import { UseAdminUsersContext } from "../../../context/admin-users-context";

const links = [
    { title: "active", icon: DashboardIcon },
    { title: "others", icon: DocIcon },
];

export function OrdinaryUsersPage() {
    const { activeTab: currentTab } = UseAdminUsersContext();
    const { proUsers, gettingProUsers } = UsersHook();
    const { businessUsers, gettingbusinessUsers } = BusinessUsersHook({
        page: 1,
        limit: 1000,
    });
    const [searchText, setSearchText] = useState("");
    // const { startDate, endDate, setStartDate, setEndDate } = DateHook();
    const [activeTab, setActiveTab] = useState(links[0].title);
    const [open, setOpen] = useState(false);

    const filterData = useMemo(() => {
        const data =
            currentTab === "business" ? [...businessUsers] : [...proUsers];
        return currentTab === "business"
            ? data.filter((item) => {
                  if (!searchText) return item;
                  const firstNameMatch = item.companyName
                      .toLowerCase()
                      .includes(searchText.toLowerCase());

                  return firstNameMatch;
              })
            : data.filter((item) => {
                  if (!searchText) return item;
                  const firstNameMatch = item.firstName
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  const lastNameMatch = item.lastName
                      .toLowerCase()
                      .includes(searchText.toLowerCase());
                  return firstNameMatch || lastNameMatch;
              });
    }, [proUsers, searchText, currentTab, businessUsers]);

    return (
        <div className="py-1">
            <div className="flex gap-4 items-center mb-4 justify-between text-xs">
                <div className="px-3 py-1 rounded-full font-semibold text-[#025949] bg-[#FFDE16]">
                    Users
                </div>

                <div className="flex gap-2">
                    {links.map((active) => {
                        const isActive = active.title === activeTab;
                        return (
                            <div
                                key={active.title}
                                className={`py-2 px-6 flex gap-2 items-center capitalize text-xs rounded-full hover:bg-[#E5EEFF] cursor-pointer hover:text-[#1A68FF] ${
                                    isActive
                                        ? "bg-[#E5EEFF] text-[#1A68FF] font-bold"
                                        : ""
                                }`}
                                onClick={() => setActiveTab(active.title)}
                            >
                                {active.title}{" "}
                                <active.icon
                                    fill={isActive ? "#1A68FF" : undefined}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="w-56">
                    <BaseInput
                        placeholder="Search by Name"
                        type="search"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div
                    onClick={() => setOpen(true)}
                    className="flex items-center justify-center rounded-full bg-black p-2 h-10 w-10 hover:opacity-60 cursor-pointer"
                >
                    <span className="text-white text-3xl">&#x2B;</span>
                </div>
            </div>
            <div>
                {gettingProUsers && gettingbusinessUsers ? (
                    <p>Please wait...</p>
                ) : (
                    <>
                        {currentTab === "pro" && (
                            <UsersTable users={filterData} />
                        )}
                        {currentTab === "business" && (
                            <BusinessUsersTable users={filterData} />
                        )}
                    </>
                )}
            </div>

            {open && (
                <AddUserModal open={open} handleClose={() => setOpen(false)} />
            )}
        </div>
    );
}
