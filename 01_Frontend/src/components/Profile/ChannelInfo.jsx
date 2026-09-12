import { useSelector } from "react-redux";
import { useState } from "react";

const ChannelInfo = () => {

    const user = useSelector((state) => state.auth.userData);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        channelName: user?.fullName || "",
        description: user?.description || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Channel Info:", formData);

        // API call will go here
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
                <h2 className="text-xl font-semibold">
                    Channel Info
                </h2>

                <p className="text-gray-400 mt-2">
                    Update your channel information.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 border border-gray-600 rounded-lg"
            >

                <div className="p-5">

                    {/* Username */}
                    <div>
                        <label className="block mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                        />
                    </div>

                    {/* Channel name */}
                    <div className="mt-5">

                        <label className="block mb-2">
                            Channel name
                        </label>

                        <input
                            type="text"
                            name="channelName"
                            value={formData.channelName}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                        />

                    </div>

                    {/* Description */}
                    <div className="mt-5">

                        <label className="block mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none resize-none"
                        />

                    </div>

                </div>

                <div className="border-t border-gray-600 p-5 flex justify-end gap-4">

                    <button
                        type="button"
                        className="border border-gray-500 px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg text-black font-semibold"
                    >
                        Save changes
                    </button>

                </div>

            </form>

        </div>
    );
};

export default ChannelInfo;