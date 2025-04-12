import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { RecruiterUpdatableFields } from "../types/types";

interface VerifyProps {
    publicEmail: string;
    website: string;
}

const useUpdateRecruiterProfile = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const profile = async ({
        logo,
        publicEmail,
        website,
        socials,
        about
    }: RecruiterUpdatableFields) => {
        const success = handleInputErrors({ publicEmail, website });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/recruiter/profile/update-profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CZ-token")}`
                },
                body: JSON.stringify({ logo, publicEmail, website, socials, about })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem("CZ-token", data.token);
            localStorage.setItem("CZ-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Profile updated successfully");
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

    return { loading, profile }
}

export default useUpdateRecruiterProfile;


function handleInputErrors({ publicEmail, website }: VerifyProps) {
    if (!publicEmail || !website) {
        toast.error("Public Email & Company Website is required");
        return false;
    }

    return true;
}