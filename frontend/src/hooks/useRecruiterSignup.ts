import { useState } from "react"
import { RecruiterSignupParams } from "../types/types";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useRecruiterSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const recruiterSignup = async ({
        companyName,
        email,
        publicEmail,
        password,
        mobileNo,
        website,
        city,
        state,
        country,
        pincode
    }: RecruiterSignupParams) => {
        const success = handleInputErrors({
            companyName,
            email,
            publicEmail,
            password,
            mobileNo,
            website,
            city,
            state,
            country,
            pincode
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/recruiter/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CZ-token")}`
                },
                body: JSON.stringify({
                    companyName,
                    email,
                    publicEmail,
                    password,
                    mobileNo,
                    website,
                    city,
                    state,
                    country,
                    pincode
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("CZ-token", data.token);
            localStorage.setItem("CZ-user", JSON.stringify(data));
            setAuthUser(data);

            if (data) {
                toast.success("Signed up Successfully");
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
    return { loading, recruiterSignup };
}

export default useRecruiterSignup;


function handleInputErrors({
    companyName,
    email,
    publicEmail,
    password,
    mobileNo,
    website,
    city,
    state,
    country,
    pincode }: RecruiterSignupParams) {
    if (!companyName || !email || !publicEmail || !password || !mobileNo || !website || !city || !state || !country || !pincode) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (companyName.length < 2) {
        toast.error("Name should be atleast 2 characters long");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    if (mobileNo.length != 10) {
        toast.error("Enter a valid Mobile no.");
        return false;
    }

    return true;
}