import { ReactNode } from "react";

export interface SignupParams {
    name: string;
    email: string;
    password: string;
    mobileNo: string;
    dob: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface AuthUser {
    _id: string;
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
    token: string;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}