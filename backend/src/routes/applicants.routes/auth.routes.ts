import express from "express";
import { signup } from "../../controllers/applicants.controller/auth.controller";

const router = express.Router();

router.post("/signup", signup);

export default router;