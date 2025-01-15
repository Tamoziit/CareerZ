import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import connectToUserDB from "./db/userDB";
import connectToRecruiterDB from "./db/recruiterDB";
import applicantAuthRoutes from "./routes/applicants.routes/auth.routes";
import { client } from "./redis/client";

const PORT = process.env.PORT || 3000;

const app = express();
const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    credentials: true
};

app.use(cors(corOpts));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/v1', (req: Request, res: Response) => {
    res.send('Server Up & Running!');
});

app.use("/api/v1/applicant/auth", applicantAuthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
    connectToUserDB();
    connectToRecruiterDB();

    if (client) {
        console.log("Redis connected");
    } else {
        console.log("Error in connecting to Redis");
    }
});