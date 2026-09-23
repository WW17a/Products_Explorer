
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDatabase from "./src/config/db.js";
import logger from "./src/config/logger.js";
import router from "./src/routes/index.js";
import requestLogger from "./src/middleware/requestLogger.js";
import notFound from "./src/middleware/notFound.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
       cors({
        origin: "http://localhost:5173",
        credentials: true,
    })

);

app.use(express.json());

app.use(requestLogger);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message:
            "Too many authentication attempts. Please try again later.",
    },
});

app.use("/api/auth", authLimiter);


app.use("/api", router);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});

app.use(notFound);

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            logger.info({
                message: "Server started",
                port: PORT,
            });
        });
    } catch (error) {
        logger.error({
            message: "Failed to start server",
            error: error.message,
        });

        process.exit(1);
    }
};

startServer();