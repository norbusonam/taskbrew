import express from "express";
import dotenv from "dotenv";
import { apiRouter } from "./routers";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/api", apiRouter);

console.log("Hello World");
