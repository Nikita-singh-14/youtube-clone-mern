import { useDispatch } from "react-redux";
import { logout } from "../../Store/features/authSlice";

const LogoutBtn = () => {

    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleLogout = async () => {
        try {
            await fetch(`${API_URL}/user/logout`, {
                method: "POST",
                credentials: "include",
            });

            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded text-red-500 hover:bg-gray-500"
        >
            Logout
        </button>
    );
};

export default LogoutBtn;