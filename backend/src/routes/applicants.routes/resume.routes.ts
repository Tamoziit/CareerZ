import express from "express";
import verifyToken from "../../middlewares/auth.middleware";
import { buildResume } from "../../controllers/applicants.controller/resume.controller";

const router = express.Router();

router.patch("/build-resume", verifyToken, buildResume);

export default router;