import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(
    `mongodb+srv://liliia:${process.env.MONGO_DB_PASSWORD}@node-db.pfksm4p.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
);
