import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js";
import expenseRoute from "./routes/expense.route.js";
import path from "path";


dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS with credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies
  })
);


app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at Port ${PORT}`);
});