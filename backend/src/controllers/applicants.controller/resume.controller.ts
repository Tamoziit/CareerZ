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

        if (profilePic !== undefined) applicant.profilePic = profilePic;
        if (bio !== undefined) applicant.bio = bio;
        if (skills !== undefined) {
            applicant.skills = [...new Set([...applicant.skills, ...skills])];
        }
        if (resume !== undefined) applicant.resume = resume;

        if (education && Array.isArray(education)) {
            education.forEach((edu) => {
                applicant.education.push(edu);
            });
        }

        if (experience && Array.isArray(experience)) {
            experience.forEach((exp) => {
                applicant.experience.push(exp);
            });
        }

        if (projects && Array.isArray(projects)) {
            projects.forEach((proj) => {
                applicant.projects.push(proj);
            });
        }

        if (socials) {
            if (socials.linkedIn) applicant.socials!.linkedIn = socials.linkedIn;
            if (socials.github) applicant.socials!.github = socials.github;
            if (socials.x) applicant.socials!.x = socials.x;
            if (socials.porfolio) applicant.socials!.porfolio = socials.porfolio;
        }

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
            socials: applicant.socials
        });
    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};