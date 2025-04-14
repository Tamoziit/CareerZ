import mongoose from "mongoose";
import connectToRecruiterDB from "../db/recruiterDB";

const recruiterDB = connectToRecruiterDB();

const JobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiters",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    publicEmail: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        enum: ["onsite", "remote"],
        required: true
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"],
        required: true
    },
    openings: {
        type: Number,
        required: true
    },
    applicants: [
        {
            applicantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Applicants"
            },
            status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                default: "pending"
            },
            appliedOn: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const Job = recruiterDB!.model("Jobs", JobSchema);
export default Job;