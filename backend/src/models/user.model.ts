import mongoose from "mongoose";
import connectToUserDB from "../db/userDB";

const userDB = connectToUserDB();

const ApplicantSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "applicant",
        required: true
    },
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
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
    dob: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    bio: {
        type: String,
        min: 10
    },
    skills: {
        type: Array,
        default: []
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resumes"
    },
    education: [
        {
            degree: {
                type: String,
                required: true
            },
            institute: {
                type: String,
                required: true
            },
            startDate: {
                type: String,
                required: true
            },
            endDate: {
                type: String,
            }
        }
    ],
    experience: [
        {
            company: {
                type: String,
                required: true
            },
            role: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            startDate: {
                type: String,
                required: true
            },
            endDate: {
                type: String,
            }
        }
    ],
    applications: [
        {
            jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Jobs",
                required: true
            },
            status: {
                type: String,
                enum: ["pending", "accepted", "rejected"],
                required: true
            },
            appliedOn: {
                type: Date,
                required: true
            }
        }
    ],
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
    socials: {
        linkedIn: {
            type: String
        },
        github: {
            type: String
        },
        x: {
            type: String
        },
        porfolio: {
            type: String
        }
    }
}, { timestamps: true });

const Applicant = userDB!.model("Applicants", ApplicantSchema);
export default Applicant;