import { Request, Response } from "express";
import { ApplicantLoginBody, ApplicantSignupBody } from "../../types/types";
import Applicant from "../../models/user.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";
import { client } from "../../redis/client";

export const signup = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            password,
            mobileNo,
            dob,
            city,
            state,
            country,
            pincode
        }: ApplicantSignupBody = req.body;

        if (password.length < 6) {
            res.status(400).json({ error: "Password should be at least 6 characters long" });
            return;
        }
        if (mobileNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Phone no." });
            return;
        }
        if (name.length < 2) {
            res.status(400).json({ error: "Name should be at least 2 characters long" });
            return;
        }

        const sameApplicant = await Applicant.findOne({ $or: [{ email }, { mobileNo }] });
        if (sameApplicant) {
            res.status(400).json({
                error: sameApplicant.mobileNo === mobileNo ? "A user with this mobile no. already exists. Use another mobile no., or try logging into your account." : "A user with this Aadhar No. already exists. Use another Aadhar No., or try logging into your account."
            });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newApplicant = new Applicant({
            name,
            email,
            password: passwordHash,
            mobileNo,
            dob,
            location: {
                city,
                state,
                country,
                pincode
            }
        });

        if (newApplicant) {
            await newApplicant.save();

            const token = generateTokenAndSetCookie(newApplicant._id, res);
            const payload = {
                token,
                _id: newApplicant._id,
                name: newApplicant.name,
                email: newApplicant.email,
                mobileNo: newApplicant.mobileNo
            };

            await client.set(`CZ-user:${newApplicant._id}`, JSON.stringify(payload));
            await client.expire(`CZ-user:${newApplicant._id}`, 30 * 24 * 60 * 60);

            res.status(201)
                .header("Authorization", `Bearer ${token}`)
                .json({
                    _id: newApplicant._id,
                    role: newApplicant.role,
                    name: newApplicant.name,
                    email: newApplicant.email,
                    mobileNo: newApplicant.mobileNo,
                    dob: newApplicant.dob,
                    profilePic: newApplicant.profilePic,
                    bio: newApplicant.bio,
                    skills: newApplicant.skills,
                    resume: newApplicant.resume,
                    education: newApplicant.education,
                    experience: newApplicant.experience,
                    projects: newApplicant.projects,
                    location: newApplicant.location,
                    socials: newApplicant.socials,
                    token
                });
        }
    } catch (error) {
        console.log("Error in Signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: ApplicantLoginBody = req.body;
        const applicant = await Applicant.findOne({ email });
        if (!applicant) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const isPaswordCorrect = await bcrypt.compare(password, applicant.password || "");
        if (!isPaswordCorrect) {
            res.status(400).json({ error: "Invalid Login Credentials" });
            return;
        }

        res.cookie("jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(applicant._id, res);
        const payload = {
            token,
            _id: applicant._id,
            name: applicant.name,
            email: applicant.email,
            mobileNo: applicant.mobileNo
        };

        await client.set(`CZ-user:${applicant._id}`, JSON.stringify(payload));
        await client.expire(`CZ-user:${applicant._id}`, 30 * 24 * 60 * 60);

        res.status(200)
            .header("Authorization", `Bearer ${token}`)
            .json({
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
                token
            });
    } catch (error) {
        console.log("Error in Login controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        res.cookie("jwt", "", { maxAge: 0 });
        await client.del(`CZ-user:${userId}`);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}