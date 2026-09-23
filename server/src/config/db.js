import mongoose from "mongoose";
import logger from "./logger.js";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        logger.info("MongoDB connected successfully");
    } catch (error) {
        logger.error("MongoDB connection failed", error);
        process.exit(1);
    }
};

export default connectDatabase;