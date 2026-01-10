import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import razorpayRoutes from "./routes/payment";



const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "http://localhost:8080",
        "https://zentik-fashion.vercel.app",
        "https://zercindia.in",
      ];

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api/razorpay", razorpayRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
