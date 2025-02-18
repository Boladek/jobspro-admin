import { MessagesSideBar } from "./messages-sidebar";
import { ChatCompartment } from "./chat-compartment";

export function MessagesPage() {
    return (
        <div className="flex items-center h-full border border-red-500 p-4">
            <div className="h-full w-64">
                <MessagesSideBar />
            </div>
            <div className="h-full flex-1">
                <ChatCompartment />
            </div>
        </div>
    );
}
