import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../../Store/features/authSlice'
import Input from "../Input";

const EditPersonalInfo = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.userData);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    const API_URL = import.meta.env.VITE_API_URL;

    // Load user data
    useEffect(() => {
        if (user) {
            const name = user.fullName?.trim().split(/\s+/) || [];

            setFormData({
                firstName: name[0] || "",
                lastName: name.slice(1).join(" ") || "",
                email: user.email || "",
            });

            setAvatarPreview(user.avatar || "");
        }
    }, [user]);

    // Clean up preview URL
    useEffect(() => {
        return () => {
            if (avatarPreview?.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Remove old message when user starts editing
        setMessage({
            type: "",
            text: "",
        });
    };

    // Handle avatar selection
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Optional file type validation
        if (!file.type.startsWith("image/")) {
            setMessage({
                type: "error",
                text: "Please select a valid image file.",
            });
            return;
        }

        // Optional size validation - 5MB
        if (file.size > 5 * 1024 * 1024) {
            setMessage({
                type: "error",
                text: "Image size should be less than 5MB.",
            });
            return;
        }

        setAvatar(file);

        // Create preview
        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);

        setMessage({
            type: "",
            text: "",
        });
    };

    // Update name and email
    const updateDetails = async () => {
        const fullName =
            `${formData.firstName} ${formData.lastName}`.trim();

        const response = await fetch(
            `${API_URL}/user/update-details`,
            {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email: formData.email,
                }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result?.message || "Failed to update personal details."
            );
        }

        return result;
    };

    // Update avatar
    const updateAvatar = async () => {
        const data = new FormData();

        data.append("avatar", avatar);

        const response = await fetch(
            `${API_URL}/user/avatar`,
            {
                method: "PATCH",
                credentials: "include",
                body: data,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result?.message || "Failed to update profile photo."
            );
        }

        return result;
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            setMessage({
                type: "error",
                text: "First name is required.",
            });
            return;
        }

        if (!formData.email.trim()) {
            setMessage({
                type: "error",
                text: "Email address is required.",
            });
            return;
        }

        setLoading(true);

        setMessage({
            type: "",
            text: "",
        });

        try {
            let updatedUser = user;

         
            const detailsResponse = await updateDetails();

            if (detailsResponse?.data) {
                updatedUser = detailsResponse.data;
            }

            
            if (avatar) {
                const avatarResponse = await updateAvatar();

                if (avatarResponse?.data) {
                    updatedUser = avatarResponse.data;
                }
            }

           
            dispatch(
                login({
                    userData: updatedUser,
                })
            );

            // Remove selected file
            setAvatar(null);

            setMessage({
                type: "success",
                text: "Personal information updated successfully.",
            });
        } catch (error) {
            console.error(
                "Update personal information error:",
                error
            );

            setMessage({
                type: "error",
                text:
                    error?.message ||
                    "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Reset form
    const handleCancel = () => {
        if (!user) return;

        const name = user.fullName?.trim().split(/\s+/) || [];

        setFormData({
            firstName: name[0] || "",
            lastName: name.slice(1).join(" ") || "",
            email: user.email || "",
        });

        setAvatar(null);
        setAvatarPreview(user.avatar || "");

        setMessage({
            type: "",
            text: "",
        });
    };

    // Get first letter for fallback avatar
    const avatarInitial =
        formData.firstName?.charAt(0)?.toUpperCase() || "U";

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

                    {/* Success / Error message */}
                    {message.text && (
                        <div
                            className={`mb-5 px-4 py-3 rounded-lg border text-sm ${
                                message.type === "success"
                                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                                    : "bg-red-500/10 border-red-500/30 text-red-400"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Profile Photo */}
                    <div className="mb-6">

                        <label className="block mb-3 font-medium">
                            Profile Photo
                        </label>

                        <div className="flex items-center gap-5">

                            {/* Avatar Preview */}
                            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-600 shrink-0">

                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-purple-500 text-white text-2xl font-semibold">
                                        {avatarInitial}
                                    </div>
                                )}

                            </div>

                            <div className="flex-1">

                                <Input
                                type='file'
                                accept='image/*'
                                onChange={handleAvatarChange}
                                disabled={loading}
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    JPG, PNG or WebP. Maximum size 5MB.
                                </p>

                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <Input
                                label="First name"
                                id='firstName'
                                type='text'
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                        />
                        <Input
                                label="Last name"
                                id='lastName'
                                type='text'
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={loading}
                        />
                    </div>
                        <Input
                                label="email"
                                type='email'
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                                required
                        />
                </div>
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
                        {loading ? "Saving..." : "Save changes"}
                    </button>

                </div>
            </form>
        </div>
    );
};
export default EditPersonalInfo;