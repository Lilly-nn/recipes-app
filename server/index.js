import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();
mongoose
  .connect(
    `mongodb+srv://liliia:${process.env.MONGO_DB_PASSWORD}@node-db.pfksm4p.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);

app.use("/", userRouter);
app.use("/api/auth", authRouter);
