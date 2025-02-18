import { ChatList } from "./chat-list";
import { ConversationDetails } from "./conversation-details";

export function ChatCompartment() {
    return (
        <div className="flex gap-4 h-full">
            <div className="max-w-sm w-full">
                <ChatList />
            </div>
            <div className="flex-1">
                <ConversationDetails />
            </div>
        </div>
    );
}
