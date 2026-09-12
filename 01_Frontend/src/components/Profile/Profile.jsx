import { useState } from "react";
import { useSelector } from "react-redux";

import EditPersonalInfo from "./EditPersonalInfo";
import ChannelInfo from "./ChannelInfo";
import ChangePassword from "./ChangePassword";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("personal");

    const user = useSelector((state) => state.auth.userData);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
                <p>Please login first.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111111] text-white">

            {/* ================= COVER IMAGE ================= */}
            <div className="h-52 w-full relative overflow-hidden bg-gray-700">

                {user.coverImage ? (
                    <img
                        src={user.coverImage}
                        alt="cover"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-700" />
                )}

            </div>


            {/* ================= PROFILE HEADER ================= */}
            <div className="px-7">

                <div className="relative flex items-end justify-between">

                    {/* LEFT SIDE */}
                    <div className="flex items-end gap-5">

                        {/* PROFILE IMAGE */}
                        <div className="relative z-10 -mt-12">

                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="profile"
                                    className="
                                        w-28 h-28
                                        rounded-full
                                        object-cover
                                        border-4
                                        border-[#111111]
                                        bg-gray-800
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        w-28 h-28
                                        rounded-full
                                        bg-purple-500
                                        flex
                                        items-center
                                        justify-center
                                        text-3xl
                                        font-bold
                                        border-4
                                        border-[#111111]
                                    "
                                >
                                    {user.fullName
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>
                            )}

                        </div>


                        {/* USER NAME */}
                        <div className="pb-2">

                            <h1 className="text-2xl font-semibold">
                                {user.fullName}
                            </h1>

                            <p className="text-gray-400">
                                @{user.username}
                            </p>

                        </div>

                    </div>


                    {/* VIEW CHANNEL BUTTON */}
                    <button
                        className="
                            mb-2
                            bg-purple-500
                            hover:bg-purple-600
                            text-white
                            font-semibold
                            px-5
                            py-2
                            rounded
                            transition
                        "
                    >
                        View channel
                    </button>

                </div>


                {/* ================= TABS ================= */}
                <div className="flex border-b border-gray-600 mt-7">

                    {/* PERSONAL INFORMATION */}
                    <button
                        onClick={() => setActiveTab("personal")}
                        className={`
                            flex-1
                            py-4
                            transition
                            ${
                                activeTab === "personal"
                                    ? "bg-white text-purple-500 border-b-2 border-purple-500"
                                    : "text-gray-400 hover:text-white"
                            }
                        `}
                    >
                        Personal Information
                    </button>


                    {/* CHANNEL INFORMATION */}
                    <button
                        onClick={() => setActiveTab("channel")}
                        className={`
                            flex-1
                            py-4
                            transition
                            ${
                                activeTab === "channel"
                                    ? "bg-white text-purple-500 border-b-2 border-purple-500"
                                    : "text-gray-400 hover:text-white"
                            }
                        `}
                    >
                        Channel Information
                    </button>


                    {/* CHANGE PASSWORD */}
                    <button
                        onClick={() => setActiveTab("password")}
                        className={`
                            flex-1
                            py-4
                            transition
                            ${
                                activeTab === "password"
                                    ? "bg-white text-purple-500 border-b-2 border-purple-500"
                                    : "text-gray-400 hover:text-white"
                            }
                        `}
                    >
                        Change Password
                    </button>

                </div>


                {/* ================= TAB CONTENT ================= */}
                <div className="py-7">

                    {activeTab === "personal" && (
                        <EditPersonalInfo />
                    )}

                    {activeTab === "channel" && (
                        <ChannelInfo />
                    )}

                    {activeTab === "password" && (
                        <ChangePassword />
                    )}

                </div>

            </div>

        </div>
    );
};

export default Profile;