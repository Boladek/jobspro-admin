import { formatTime } from "../../helpers/function";

export function ChatBox() {
    const isEven = Math.floor(Math.random() * 6) % 2 === 0;

    return (
        <div className={`flex items-center ${isEven ? "justify-end" : ""}`}>
            <div className="border-[0.5px] border-[#0072BB] p-4 pb-6 rounded-[8px] max-w-[90%] w-fit bg-[#fff] text-[12px] relative">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia
                perferendis ut id fugit? Id nostrum repudiandae illum sapiente
                nisi dolorum at beatae dolore. Neque nostrum vel, labore iste
                alias quisquam.
                <span className="absolute bottom-1 right-1 text-[#667085]">
                    {formatTime(new Date())}
                </span>
            </div>
        </div>
    );
}

ChatBox.propTypes = {};
