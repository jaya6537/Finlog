import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { seedDefaultCategories } from "./controllers/categoryController.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDefaultCategories();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
