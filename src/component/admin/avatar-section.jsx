import { useState, useRef, useEffect } from "react";
import avatar from "../../assets/avatar.svg";
// import referral from "../../assets/referral.png";
import logoutIcon from "../../assets/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export function AvatarSection() {
  // const { chatLogout } = UseChat();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    // setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown when clicking outside of it
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.id !== "menu-button"
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    dispatch(logout());
    // chatLogout();
  }

  useEffect(() => {
    if (isDropdownOpen) {
      const dropdownElement = dropdownRef.current;
      const dropdownRect = dropdownElement.getBoundingClientRect();
      const dropdownHeight = dropdownRect.height;
      const dropdownWidth = dropdownRect.width;
      const { innerHeight, innerWidth } = window;
      const { top, left } = dropdownRect;

      if (top + dropdownHeight > innerHeight) {
        dropdownElement.style.top = `${innerHeight - dropdownHeight}px`;
      }

      if (left + dropdownWidth > innerWidth) {
        dropdownElement.style.left = `${innerWidth - dropdownWidth}px`;
      }
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative">
      <div
        className="flex gap-2 items-center cursor-pointer"
        ref={dropdownRef}
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        <div className="px-6 py-1 rounded-full text-[10px] border bg-gray-200 text-[#66857F] font-semibold capitalize border-black/20">
          admin
        </div>
        <img
          src={avatar}
          className="h-9 w-9 rounded-full hover:opacity-80"
          id="menu-button"
          alt="Avatar"
          title="Click to see more information"
        />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-64 origin-top-right p-3 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="flex gap-1 items-center mb-4" role="none">
            <div>
              <img
                src={avatar}
                className="h-12 w-12 rounded-full cursor-pointer hover:opacity-80"
                alt="Avatar"
              />
            </div>
            <div>
              <div className="text-sm font-bold flex gap-1 items-center">
                Admin Name
                {/* <img src={tickIcon} alt="Tick circle" className="h-5" /> */}
              </div>
              <span
                className="bg-[#42BE65] px-2 rounded-full text-white text-xs vertical-align capitalize"
                style={{
                  padding: ".25rem .5rem",
                }}
              >
                Admin
              </span>
            </div>
          </div>
          <hr />
          <div className="mt-4">
            <div className="p-1">
              <div className="flex gap-2 items-center cursor-pointer">
                {/* <img src={referral} alt="Referrals" className="h-6" /> */}
                <span className="text-xs text-gray-500 hover:text-black">
                  Referrals
                </span>
              </div>
            </div>
            <div className="p-1">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleLogout}
              >
                <img src={logoutIcon} alt="Logout" className="h-6" />
                <span className="text-xs text-red-500 hover:text-red-700">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
