import { useState } from "react";

const tabs = ["Publish", "Templates"];
export function NotificationTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return (
        <div className="space-y-4">
            {tabs.map((tab) => (
                <div
                    onClick={() => setActiveTab(tab)}
                    key={tab}
                    className={`${
                        tab === activeTab
                            ? "text-[#0030DC] font-[700] border-l-[#FFDE16]"
                            : "text-[#667085] border-l-transparent"
                    } text-[14px] cursor-pointer border-l-[5px] pl-2 transition-all duration-300 linear`}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
}
