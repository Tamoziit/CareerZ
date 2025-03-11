import mongoose from "mongoose";
import connectToRecruiterDB from "../db/recruiterDB";

const recruiterDB = connectToRecruiterDB();

const RecruiterSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "recruiter",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    publicEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    about: {
        type: String,
        min: 10
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    jobPostings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs"
        }
    ],
    socials: {
        linkedIn: {
            type: String
        },
        x: {
            type: String
        },
        portfolio: {
            type: String
        }
    }
}, { timestamps: true });

const Recruiter = recruiterDB!.model("Recruiters", RecruiterSchema);
export default Recruiter;