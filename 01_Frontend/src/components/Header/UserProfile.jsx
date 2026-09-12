import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const UserProfile = () => {
    const [open, setOpen] = useState(false);

    const user = useSelector((state) => state.auth.userData);

    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer"
            >
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        {user.fullName?.charAt(0).toUpperCase()}
                    </div>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-64 bg-gray-800 rounded-lg shadow-lg border border-white p-4 z-50">

                    {/* User Info */}
                    <div className="border-b pb-3 mb-3">
                        <p className="font-semibold text-white">
                            {user.fullName}
                        </p>

                        <p className="text-sm text-gray-200">
                            @{user.username}
                        </p>

                        <p className="text-sm text-gray-200 truncate">
                            {user.email}
                        </p>
                    </div>

                    <Link
                        to="/profile"
                        className="block px-3 py-2 rounded hover:bg-gray-500 text-gray-200"
                        onClick={() => setOpen(false)}
                    >
                        Edit Personal Info
                    </Link>

                    <div className="mt-1">
                        <LogoutBtn />
                    </div>

                </div>
            )}
        </div>
    );
};

export default UserProfile;