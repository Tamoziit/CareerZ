import { useState } from "react"
import { PostJobProps } from "../types/types";
import toast from "react-hot-toast";

const usePostJob = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const postJob = async ({
        title,
        description,
        requirements,
        tags,
        salary,
        location,
        jobType,
        openings
    }: PostJobProps) => {
        const success = handleInputErrors({
            title,
            description,
            requirements,
            tags,
            salary,
            location,
            jobType,
            openings
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/recruiter/jobs/post-job`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("CZ-token")}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    requirements,
                    tags,
                    salary,
                    location,
                    jobType,
                    openings
                })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Job Opportunity posted Successfully");
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
    return { loading, postJob };
}

export default usePostJob;


function handleInputErrors({
    title,
    description,
    salary,
    location,
    jobType,
    openings }: PostJobProps) {
    if (!title || !description || !salary || !location || !jobType || !openings) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (salary <= 0) {
        toast.error("Enter a valid Salary");
        return false;
    }

    if (openings < 1) {
        toast.error("No. of Openings should be atleast 1");
        return false;
    }

    if (location !== "onsite" && location !== "remote") {
        toast.error("Enter valid Location");
        return false;
    }

    if (jobType !== "full-time" && jobType !== "part-time" && jobType !== "internship" && jobType !== "contract") {
        toast.error("Enter valid Job type");
        return false;
    }

    return true;
}