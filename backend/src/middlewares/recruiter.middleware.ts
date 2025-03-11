import jwt, { JwtPayload } from "jsonwebtoken";
import { client } from "../redis/client";
import { NextFunction, Request, Response } from "express";
import Recruiter from "../models/recruiter.model";

const verifyRecruiter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized - No Token Provided" });
            return;
        }

        const decodedRecruiter = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: string };
        if (!decodedRecruiter) {
            res.status(401).json({ error: "Unauthorized - Invalid Token" });
            return;
        }

        const redisKey = `CZ-recruiter:${decodedRecruiter.userId}`;
        const payload = await client.get(redisKey);
        if (!payload) {
            res.status(401).json({ error: "Unauthorized - No Recruiter Data in Cache, Login first" });
            return;
        }

        const data = JSON.parse(payload);
        if (data.token !== token) {
            res.status(401).json({ error: "Unauthorized - Token Mismatch" });
            return;
        }

        const recruiter = await Recruiter.findById(decodedRecruiter.userId).select("-password");
        if (!recruiter) {
            res.status(404).json({ error: "User Not Found!" });
            return;
        }

        req.recruiter = recruiter;
        next();
    } catch (err) {
        console.log("Error in verifyToken middleware", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default verifyRecruiter;