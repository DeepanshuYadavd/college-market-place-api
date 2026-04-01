import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./api/routes/auth.routes.js";
import collegeRouter from "./api/routes/college.routes.js";
import cookieParser from "cookie-parser";

//  config:
dotenv.config(); //it will return process object

const app = express();
//  middlewares:
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//  routes:
app.use("/api/auth", authRouter);
app.use("/api/college", collegeRouter);

//  api :

//  http://localhost:5000/api/college/admin

export default app;
