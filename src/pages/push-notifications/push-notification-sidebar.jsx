import { EngagementCard } from "./engagement-card";
import { NotificationTabs } from "./notification-tabs";

export function PushNotificationSideBar() {
    return (
        <div className="space-y-8">
            <div>
                <NotificationTabs />
            </div>
            <div>Category</div>
            <div>
                <EngagementCard
                    title={
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFDE16] px-4 py-1 text-[10px] rounded-full text-nowrap">
                            <strong>Highest</strong> Engagement
                        </div>
                    }
                />
            </div>
            <div>
                <EngagementCard
                    title={
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFDE16] px-4 py-1 text-[10px] rounded-full text-nowrap">
                            <strong>Lowest</strong> Engagement
                        </div>
                    }
                />
            </div>
        </div>
    );
}
