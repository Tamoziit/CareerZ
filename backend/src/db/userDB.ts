import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectToUserDB = () => {
    try {
        const UserDB = mongoose.createConnection(process.env.USER_DB!);
        console.log("Connected to User DB");
        return UserDB;
    } catch (error) {
        console.log("Error in connecting to User DB: ", error);
    }
}

export default connectToUserDB;