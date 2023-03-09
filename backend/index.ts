import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { apiRouter } from "./routers";

// load environment variables from .env file
dotenv.config();

// configure server
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.APP_ORIGIN }));
app.use("/api", apiRouter);

// start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
