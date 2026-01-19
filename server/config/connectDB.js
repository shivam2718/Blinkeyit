import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI) {
   throw new Error("please define the MONGODB_URI environment variable inside .env file");
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        // In serverless environments, don't exit the process
        // Instead, throw the error to be handled by the caller
        throw error;
    }
}
export default connectDB;