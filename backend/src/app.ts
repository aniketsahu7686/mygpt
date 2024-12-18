import express from "express";
import {config} from "dotenv";
import morgan from 'morgan';
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();


// middlewares
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
// middle for send the cookie directly from backend to frontend using cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));


// we will use this only in development mode and remove it in production 
app.use(morgan("dev"));

app.use("/api/v1",appRouter);


  

export default app;