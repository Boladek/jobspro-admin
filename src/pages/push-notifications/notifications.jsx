import { NotificationCard } from "./notification-card";
import { generateArray } from "../../helpers/function";
const tabs = [
    { title: "Delivered", color: "#57FFAE" },
    { title: "Queue", color: "#FFBE16" },
    { title: "Failed", color: "#FF424D" },
];

export function Notifications() {
    return (
        <div className="space-y-4">
            <div className="flex gap-8">
                {tabs.map((tab) => (
                    <div
                        key={tab.title}
                        className="flex gap-1 items-center font-[600] text-[12px]"
                    >
                        <div
                            style={{ background: tab.color }}
                            className="h-[5px] w-[40px] rounded-[20px]"
                        />{" "}
                        {tab.title}
                    </div>
                ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {generateArray(10).map(() => (
                    <NotificationCard key={Math.random()} />
                ))}
            </div>
        </div>
    );
}
