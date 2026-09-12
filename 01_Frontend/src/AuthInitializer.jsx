import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login as authLogin } from "./Store/features/authSlice";

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/user/current-user`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    return;
                }

                const result = await response.json();

                if (result.success) {
                    dispatch(
                        authLogin({
                            userData: result.data,
                        })
                    );
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        };

        getCurrentUser();
    }, [dispatch, API_URL]);

    return children;
};

export default AuthInitializer;