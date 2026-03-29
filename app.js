import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./api/routes/auth.routes.js";

//  config:
dotenv.config(); //it will return process object

const app = express();
//  middlewares:
app.use(cors());
app.use(express.json());

//  routes:
app.use("/api/auth", authRouter);

//  api :
// http://localhost:5000/api/auth/signup

export default app;
