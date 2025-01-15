import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToRecruiterDB = () => {
    try {
        const RecruiterDB = mongoose.createConnection(process.env.RECRUITER_DB!);
        console.log("Connected to Recruiter DB");
        return RecruiterDB;
    } catch (error) {
        console.log("Error in connecting to Recruiter DB: ", error);
    }
}

export default connectToRecruiterDB;