import { Request, Response } from "express";
import Recruiter from "../../models/recruiter.model";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";
import { client } from "../../redis/client";
import { RecruiterLoginBody, RecruiterSignupBody } from "../../types/types";

export const signup = async (req: Request, res: Response) => {
    try {
        const {
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
        }: RecruiterSignupBody = req.body;

        if (password.length < 6) {
            res.status(400).json({ error: "Password should be at least 6 characters long" });
            return;
        }
        if (mobileNo.length !== 10) {
            res.status(400).json({ error: "Enter a valid Phone no." });
            return;
        }

        const sameRecruiter = await Recruiter.findOne({ $or: [{ email }, { mobileNo }] });
        if (sameRecruiter) {
            res.status(400).json({
                error: sameRecruiter.mobileNo === mobileNo ? "A Recruiter with this mobile no. already exists. Use another mobile no., or try logging into your account." : "A Recruiter with this Email. already exists. Use another Aadhar No., or try logging into your account."
            });
            return;
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newRecruiter = new Recruiter({
            companyName,
            email,
            publicEmail,
            password: passwordHash,
            mobileNo,
            website,
            location: {
                city,
                state,
                country,
                pincode
            }
        });

        if (newRecruiter) {
            await newRecruiter.save();

            const token = generateTokenAndSetCookie(newRecruiter._id, res);
            const payload = {
                token,
                _id: newRecruiter._id,
                name: newRecruiter.companyName,
                email: newRecruiter.email,
                mobileNo: newRecruiter.mobileNo
            };

            await client.set(`CZ-recruiter:${newRecruiter._id}`, JSON.stringify(payload));
            await client.expire(`CZ-recruiter:${newRecruiter._id}`, 30 * 24 * 60 * 60);

            res.status(201)
                .header("Authorization", `Bearer ${token}`)
                .json({
                    _id: newRecruiter._id,
                    role: newRecruiter.role,
                    name: newRecruiter.companyName,
                    email: newRecruiter.email,
                    publicEmail: newRecruiter.publicEmail,
                    mobileNo: newRecruiter.mobileNo,
                    website: newRecruiter.website,
                    logo: newRecruiter.logo,
                    about: newRecruiter.about,
                    location: newRecruiter.location,
                    jobPostings: newRecruiter.jobPostings,
                    socials: newRecruiter.socials,
                    token
                });
        }
    } catch (error) {
        console.log("Error in Recruiter Signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password }: RecruiterLoginBody = req.body;
        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) {
            res.status(400).json({ error: "Cannot find Recruiter Account" });
            return;
        }

        const isPaswordCorrect = await bcrypt.compare(password, recruiter.password || "");
        if (!isPaswordCorrect) {
            res.status(400).json({ error: "Invalid Login Credentials" });
            return;
        }

        res.cookie("jwt", "", { maxAge: 0 });
        const token = generateTokenAndSetCookie(recruiter._id, res);
        const payload = {
            token,
            _id: recruiter._id,
            name: recruiter.companyName,
            email: recruiter.email,
            mobileNo: recruiter.mobileNo
        };

        await client.set(`CZ-recruiter:${recruiter._id}`, JSON.stringify(payload));
        await client.expire(`CZ-recruiter:${recruiter._id}`, 30 * 24 * 60 * 60);

        res.status(200)
            .header("Authorization", `Bearer ${token}`)
            .json({
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
                token
            });
    } catch (error) {
        console.log("Error in Login controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const recruiterId = req.params.id;

        res.cookie("jwt", "", { maxAge: 0 });
        await client.del(`CZ-recruiter:${recruiterId}`);

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in Logging out", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}