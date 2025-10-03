import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js";
import expenseRoute from "./routes/expense.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);
// http://localhost:8000/api/v1/user/register
// http://localhost:8000/api/v1/user/login

const PORT = 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Listen at Port ${PORT}`);
});
