import { useState } from "react"
import { SignupParams } from "../types/types";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const signup = async ({
        name,
        email,
        password,
        mobileNo,
        dob,
        city,
        state,
        country,
        pincode
    }: SignupParams) => {
        const success = handleInputErrors({
            name,
            email,
            password,
            mobileNo,
            dob,
            city,
            state,
            country,
            pincode
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/applicant/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CZ-token")}`
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    mobileNo,
                    dob,
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
    return { loading, signup };
}

export default useSignup;


function handleInputErrors({ name,
    email,
    password,
    mobileNo,
    dob,
    city,
    state,
    country,
    pincode }: SignupParams) {
    if (!name || !email || !password || !mobileNo || !dob || !city || !state || !country || !pincode) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (name.length < 2) {
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