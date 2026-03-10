import express from "express";
import cors from "cors";
import helmet from "helmet";
import { globalLimiter } from "./middleware/rateLimit.middleware";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";
import authRoutes from "./routes/auth.routes";
import branchRoutes from "./routes/branch.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(globalLimiter);

// in production i would probably introduce api versioning (e.g. /api/v1, /api/v2).
// this helps when updating the mobile app because older app versions can still
// call the previous api version without breaking while users gradually update.

app.use("/api/auth", authRoutes);
app.use("/api/branches", branchRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
