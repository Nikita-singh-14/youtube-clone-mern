import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditPersonalInfo = () => {

    const user = useSelector((state) => state.auth.userData);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user) {
            const name = user.fullName?.split(" ") || [];

            setFormData({
                firstName: name[0] || "",
                lastName: name.slice(1).join(" ") || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("fullName", `${formData.firstName} ${formData.lastName}`.trim());
        data.append("email", formData.email);

        if (avatar) {
            data.append("avatar", avatar);
        }

        console.log("Personal Info:", formData);

        // API call will go here
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Left section */}
            <div>
                <h2 className="text-xl font-semibold">
                    Personal Info
                </h2>

                <p className="text-gray-400 mt-2">
                    Update your photo and personal details.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 border border-gray-600 rounded-lg"
            >

                <div className="p-5">

                    {/* Avatar */}
                    <div className="mb-6">

                        <label className="block mb-2">
                            Profile Photo
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className="text-gray-300"
                        />

                    </div>

                    {/* Names */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block mb-2">
                                First name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2">
                                Last name
                            </label>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                            />
                        </div>

                    </div>

                    {/* Email */}
                    <div className="mt-5">

                        <label className="block mb-2">
                            Email address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                        />

                    </div>

                </div>

                {/* Buttons */}
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

export default EditPersonalInfo;