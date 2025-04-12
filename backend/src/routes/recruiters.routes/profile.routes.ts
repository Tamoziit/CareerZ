import express from "express";
import verifyRecruiter from "../../middlewares/recruiter.middleware";
import { updateRecruiterProfile } from "../../controllers/recruiters.controllers/profile.controller";

const router = express.Router();

router.patch("/update-profile", verifyRecruiter, updateRecruiterProfile);

export default router;