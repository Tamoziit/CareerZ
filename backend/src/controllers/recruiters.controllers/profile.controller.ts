import { Request, Response } from "express";
import Recruiter from "../../models/recruiter.model";

export const updateRecruiterProfile = async (req: Request, res: Response) => {
    try {
        const recruiter = await Recruiter.findByIdAndUpdate(req.recruiter?._id, req.body, {
            new: true,
            runValidators: true
        }).select("-password");


        if (recruiter) {
            res.status(200).json({
                _id: recruiter._id,
                role: recruiter.role,
                name: recruiter.companyName,
                email: recruiter.email,
                publicEmail: recruiter.publicEmail,
                mobileNo: recruiter.mobileNo,
                website: recruiter.website,
                logo: recruiter.logo,
                about: recruiter.about,
                location: recruiter.location,
                jobPostings: recruiter.jobPostings,
                socials: recruiter.socials,
                token: req.headers.authorization?.split(" ")[1],
            });
        } else {
            res.status(400).json({ error: "Couldn't Update your Profile" });
        }
    } catch (error) {
        console.log("Error in updateRecruiterProfile controller", error);
        res.status(500).json({ error: "Internal Server error" })
    }
}