import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface Applicant {
    _id: Types.ObjectId;
    role: string;
    name: string;
    email: string;
    mobileNo: string;
    dob: string;
    profilePic?: string | null;
    bio?: string | null;
    skills: string[];
    resume?: string | null;
    education: {
        degree: string;
        institute: string;
        startDate: string;
        endDate?: string | null;
    }[];
    experience: {
        company: string;
        role: string;
        description: string;
        startDate: string;
        endDate?: string | null;
    }[];
    projects: {
        name: string;
        description: string;
        url?: string | null;
    }[];
    applications: {
        jobId: Types.ObjectId;
        status: "pending" | "accepted" | "rejected";
        appliedOn: Date;
    }[];
    location?: {
        city: string;
        state: string;
        country: string;
        pincode: string;
    } | null;
    socials?: {
        linkedIn?: string | null;
        github?: string | null;
        x?: string | null;
        porfolio?: string | null;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}

interface Recruiter {
    _id: Types.ObjectId;
    role: string;
    companyName: string;
    email: string;
    publicEmail: string;
    password: string;
    mobileNo: string;
    website: string;
    logo?: string | null;
    about?: string | null;
    location?: {
        city: string;
        state: string;
        country: string;
        pincode: string;
    } | null;
    jobPostings: Types.ObjectId[];
    socials?: {
        linkedIn?: string | null;
        github?: string | null;
        x?: string | null;
        porfolio?: string | null;
    } | null;
    createdAt: Date;
    updatedAt: Date;
}

declare module "express" {
    export interface Request {
        applicant?: Applicant;
        recruiter?: Recruiter
    }
}

export interface ApplicantSignupBody {
    name: string,
    email: string,
    password: string,
    mobileNo: string,
    dob: string,
    city: string,
    state: string,
    country: string,
    pincode: string
}

export interface ApplicantLoginBody {
    email: string,
    password: string
}

export interface ResumeBody {
    profilePic?: string | null;
    bio?: string | null;
    skills: string[];
    resume?: string | null;
    education: {
        degree: string;
        institute: string;
        startDate: string;
        endDate?: string | null;
    }[];
    experience: {
        company: string;
        role: string;
        description: string;
        startDate: string;
        endDate?: string | null;
    }[];
    projects: {
        name: string;
        description: string;
        url?: string | null;
    }[];
    socials?: {
        linkedIn?: string | null;
        github?: string | null;
        x?: string | null;
        porfolio?: string | null;
    } | null;
}

export interface RecruiterSignupBody {
    companyName: string;
    email: string;
    publicEmail: string;
    password: string;
    mobileNo: string;
    website: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface RecruiterLoginBody {
    email: string,
    password: string
}

export interface JobPostingProps {
    title: string;
    description: string;
    requirements: string[];
    tags: string[];
    salary: number;
    location: "onsite" | "remote";
    jobType: "full-time" | "part-time" | "internship" | "contract";
    openings: number;
}