import express from "express";
import authRoutes from "./routes/authRoutes.js";
import ProductRoutes from './routes/productRoutes.js'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Database Connection Error", e.message);
  });

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/product', ProductRoutes);

