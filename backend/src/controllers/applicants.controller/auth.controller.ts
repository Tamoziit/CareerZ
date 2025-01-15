import { Request, Response } from "express";
import { ApplicantSignupBody } from "../../types/types";
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
                    name: newApplicant.name,
                    email: newApplicant.email,
                    mobileNo: newApplicant.mobileNo,
                    dob: newApplicant.dob,
                    location: newApplicant.location,
                    token
                });
        }
    } catch (error) {
        console.log("Error in Signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}