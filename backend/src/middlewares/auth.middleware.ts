import jwt, { JwtPayload } from "jsonwebtoken";
import { client } from "../redis/client";
import { NextFunction, Request, Response } from "express";
import Applicant from "../models/user.model";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized - No Token Provided" });
            return;
        }

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: string };
        if (!decodedUser) {
            res.status(401).json({ error: "Unauthorized - Invalid Token" });
            return;
        }

        const redisKey = `CZ-user:${decodedUser.userId}`;
        const payload = await client.get(redisKey);
        if (!payload) {
            res.status(401).json({ error: "Unauthorized - No User Data in Cache, Login first" });
            return;
        }

        const data = JSON.parse(payload);
        if (data.token !== token) {
            res.status(401).json({ error: "Unauthorized - Token Mismatch" });
            return;
        }

        const user = await Applicant.findById(decodedUser.userId).select("-password");
        if (!user) {
            res.status(404).json({ error: "User Not Found!" });
            return;
        }

        req.applicant = user;
        next();
    } catch (err) {
        console.log("Error in verifyToken middleware", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default verifyToken;