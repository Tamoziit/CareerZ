import express from "express";
import verifyRecruiter from "../../middlewares/recruiter.middleware";
import { postJob } from "../../controllers/recruiters.controllers/jobs.controller";

const router = express.Router();

router.post("/post-job", verifyRecruiter, postJob);

export default router;