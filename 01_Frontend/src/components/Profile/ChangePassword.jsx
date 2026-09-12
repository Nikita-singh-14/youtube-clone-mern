import { useState } from "react";

const ChangePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.newPassword !== formData.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        console.log("Password data:", formData);

        // API call will go here
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
                <h2 className="text-xl font-semibold">
                    Change Password
                </h2>

                <p className="text-gray-400 mt-2">
                    Update your account password.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 border border-gray-600 rounded-lg"
            >

                <div className="p-5">

                    {/* Old password */}
                    <div>
                        <label className="block mb-2">
                            Current password
                        </label>

                        <input
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                            required
                        />
                    </div>

                    {/* New password */}
                    <div className="mt-5">

                        <label className="block mb-2">
                            New password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                            required
                        />

                    </div>

                    {/* Confirm password */}
                    <div className="mt-5">

                        <label className="block mb-2">
                            Confirm new password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none"
                            required
                        />

                    </div>

                    {error && (
                        <p className="text-red-500 mt-4">
                            {error}
                        </p>
                    )}

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
                        Change password
                    </button>

                </div>

            </form>

        </div>
    );
};

export default ChangePassword;