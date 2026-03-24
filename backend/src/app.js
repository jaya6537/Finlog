import cors from "cors";
import express from "express";
import categoryRoutes from "./routes/categoryRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "finlog-backend" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/stats", statsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
