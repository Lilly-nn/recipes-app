import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import recipeRouter from "./routes/recipeRoute.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);

app.use("/", userRouter);
app.use("/api/auth", authRouter);
app.use("/recipes", recipeRouter);
