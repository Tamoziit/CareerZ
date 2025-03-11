import mongoose from "mongoose";
import connectToRecruiterDB from "../db/recruiterDB";

const recruiterDB = connectToRecruiterDB();

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiters",
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
    salary: {
        type: Number,
        required: true
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
        }
    },
    jobType: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"],
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