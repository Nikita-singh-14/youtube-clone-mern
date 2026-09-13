import { useState } from "react";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear messages when user starts editing
        setError("");
        setSuccess("");
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    // Change password
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Check passwords
        if (formData.newPassword !== formData.confirmPassword) {
            setError(
                "New password and confirm password do not match."
            );
            return;
        }

        // Prevent same password
        if (formData.oldPassword === formData.newPassword) {
            setError(
                "New password must be different from your current password."
            );
            return;
        }

        // Basic password length validation
        if (formData.newPassword.length < 6) {
            setError(
                "New password must be at least 6 characters long."
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/user/change-password`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result?.message ||
                    "Failed to change password."
                );
            }

            setSuccess(
                result?.message ||
                "Password changed successfully."
            );

            // Clear form after successful password change
            resetForm();

        } catch (error) {
            console.error("Change password error:", error);

            setError(
                error?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Cancel button
    const handleCancel = () => {
        resetForm();

        setError("");
        setSuccess("");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Left section */}
            <div>
                <h2 className="text-xl font-semibold">
                    Change Password
                </h2>

                <p className="text-gray-400 mt-2">
                    Update your account password.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="md:col-span-2 border border-gray-600 rounded-lg"
            >

                <div className="p-5">

                    {/* Success message */}
                    {success && (
                        <div className="mb-5 px-4 py-3 rounded-lg border border-green-500/30 bg-green-500/10 text-green-400 text-sm">
                            {success}
                        </div>
                    )}

                    {/* Error message */}
                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Old password */}
                    <div>
                        <label
                            htmlFor="oldPassword"
                            className="block mb-2"
                        >
                            Current password
                        </label>

                        <input
                            id="oldPassword"
                            type="password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            autoComplete="current-password"
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none focus:border-purple-500 disabled:opacity-50"
                        />
                    </div>

                    {/* New password */}
                    <div className="mt-5">

                        <label
                            htmlFor="newPassword"
                            className="block mb-2"
                        >
                            New password
                        </label>

                        <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            minLength={6}
                            autoComplete="new-password"
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none focus:border-purple-500 disabled:opacity-50"
                        />

                        <p className="text-xs text-gray-500 mt-2">
                            Password must be at least 6 characters.
                        </p>

                    </div>

                    {/* Confirm password */}
                    <div className="mt-5">

                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2"
                        >
                            Confirm new password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            minLength={6}
                            autoComplete="new-password"
                            className="w-full bg-transparent border border-gray-500 rounded-lg px-3 py-3 outline-none focus:border-purple-500 disabled:opacity-50"
                        />

                    </div>

                </div>

                {/* Buttons */}
                <div className="border-t border-gray-600 p-5 flex justify-end gap-4">

                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="border border-gray-500 px-5 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? "Changing..."
                            : "Change password"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default ChangePassword;
