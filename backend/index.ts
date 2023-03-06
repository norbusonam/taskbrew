import express from "express";
import dotenv from "dotenv";
import { apiRouter } from "./routers";
import { PrismaClient } from "@prisma/client";

// load environment variables from .env file
dotenv.config();

// configure server
const app = express();
app.use(express.json());
app.use("/api", apiRouter);

// start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
