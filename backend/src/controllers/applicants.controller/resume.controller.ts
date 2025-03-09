import { Request, Response } from "express";
import { ResumeBody } from "../../types/types";
import Applicant from "../../models/user.model";

export const buildResume = async (req: Request, res: Response) => {
    try {
        const {
            profilePic,
            bio,
            skills,
            resume,
            education,
            experience,
            projects,
            socials
        }: ResumeBody = req.body;
        const id = req.applicant?._id;

        if (!id) {
            res.status(400).json({ message: "Applicant ID is missing" });
            return;
        }

        const applicant = await Applicant.findById(id);

        if (!applicant) {
            res.status(400).json({ message: "Applicant not found" });
            return;
        }

        if (profilePic !== undefined) applicant.set("profilePic", profilePic);
        if (bio !== undefined) applicant.set("bio", bio);
        if (skills !== undefined) applicant.set("skills", skills);
        if (resume !== undefined) applicant.set("resume", resume);

        if (education !== undefined) applicant.set("education", education);
        if (experience !== undefined) applicant.set("experience", experience);
        if (projects !== undefined) applicant.set("projects", projects);

        if (socials !== undefined) applicant.set("socials", socials);

        await applicant.save();

        res.status(200).json({
            _id: applicant._id,
            role: applicant.role,
            name: applicant.name,
            email: applicant.email,
            mobileNo: applicant.mobileNo,
            dob: applicant.dob,
            profilePic: applicant.profilePic,
            bio: applicant.bio,
            skills: applicant.skills,
            resume: applicant.resume,
            education: applicant.education,
            experience: applicant.experience,
            projects: applicant.projects,
            location: applicant.location,
            socials: applicant.socials,
            token: req.headers.authorization?.split(" ")[1]
        });
    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};