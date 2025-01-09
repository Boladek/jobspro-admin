import { useState } from "react";
import { Switch } from "../../../../component/switch";
import { UserDetailsHook } from "../../../../hooks/user-details-hook";
import { useParams } from "react-router-dom";
import { Overlay } from "../../../../component/overlay-component";

export function SuspendUser() {
  const { userId } = useParams();
  const { blockUser, loading } = UserDetailsHook({ id: userId });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-[#FFF8CD] text-black/50 select-none">
      {loading && <Overlay message="" />}
      <p className="font-semibold text-sm mb-1">Suspend User</p>
      <div className="flex gap-2 justify-between items-center mb-4">
        <p
          className="text-tiny hover:underline"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          Click here to suspend user account
        </p>
        <span>
          <Switch handleChecked={() => null} checked />
        </span>
      </div>
      {isExpanded && (
        <div>
          <p className="font-semibold text-xs mb-2 text-black/50">
            Do you want to suspend this user
          </p>
          <div className="flex gap-4 max-w-[300px]">
            <div className="flex-1">
              <button
                className="border border-black/20 p-2 text-xs w-full rounded-md capitalize"
                onClick={() => {
                  blockUser(userId);
                  setIsExpanded(false);
                }}
              >
                yes
              </button>
            </div>
            <div className="flex-1">
              <button className="border border-black/20 p-2 text-xs w-full rounded-md capitalize bg-white">
                no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
