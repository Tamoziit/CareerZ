import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { AuthUser } from "../types/types";

const useUpdateResume = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const updateResume = async (user: AuthUser) => {
        setLoading(true);
        try {
            const { token, ...userData } = user;
            const res = await fetch(`${apiUrl}/applicant/resume/build-resume`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CZ-token")}`
                },
                body: JSON.stringify(userData)
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("CZ-token", data.token);
            localStorage.setItem("CZ-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Resume updated successfully");
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

    return { loading, updateResume }
}

export default useUpdateResume;