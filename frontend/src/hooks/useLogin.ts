import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { LoginParams } from "../types/types";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async ({ email, password }: LoginParams) => {
        const success = handleInputErrors({ email, password });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/applicant/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CZ-token")}`,
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("CZ-token", data.token);
            localStorage.setItem("CZ-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Logged in successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

export default useLogin;


function handleInputErrors({ email, password }: LoginParams) {
    if (!email || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("password should be atleast 6 characters long");
        return false;
    }

    return true;
}