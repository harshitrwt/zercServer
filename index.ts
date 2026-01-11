// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth";
// import userRoutes from "./routes/user";
// import razorpayRoutes from "./routes/payment";

// const app = express();

// app.set("trust proxy", 1);

// app.use(cookieParser());

// app.use(
//   cors({
//     origin: [
//       "http://localhost:8080",
//       "https://zentik-fashion.vercel.app",
//       "https://zercindia.in",
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
// app.use("/api/razorpay", razorpayRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });


import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import razorpayRoutes from "./routes/payment";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://zentik-fashion.vercel.app",
      "https://zercindia.in",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/api/razorpay", razorpayRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
