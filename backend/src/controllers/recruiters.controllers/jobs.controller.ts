import { Request, Response } from "express";
import Job from "../../models/job.model";
import Recruiter from "../../models/recruiter.model";

export const postJob = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            openings
        } = req.body;
        const company = req.recruiter?._id;
        const companyName = req.recruiter?.companyName;

        if (salary < 0) {
            res.status(400).json({ error: "Enter correct salary details" });
            return;
        }
        if (!["onsite", "remote"].includes(location)) {
            res.status(400).json({ error: "Enter correct location details" });
            return;
        }
        if (!["full-time", "part-time", "internship", "contract"].includes(jobType)) {
            res.status(400).json({ error: "Enter correct Job Type" });
            return;
        }
        if (openings < 1) {
            res.status(400).json({ error: "There should be atleast 1 opening" });
            return;
        }

        const newJob = new Job({
            company,
            companyName,
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            openings
        });

        if (newJob) {
            await newJob.save();
            await Recruiter.findByIdAndUpdate(company, {
                $push: { jobPostings: newJob._id }
            });

            res.status(201).json(newJob);
        } else {
            res.status(400).json({ error: "Could not post job. Enter correct details or try again later." });
        }
    } catch (error) {
        console.log("Error in Posting Job", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}