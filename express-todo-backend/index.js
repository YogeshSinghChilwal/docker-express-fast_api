import 'dotenv/config'
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";

const app = express();

// Basic security headers
app.use(helmet());

// CORS — restrict origins in production
app.use(cors({ origin: "*", credentials: true }));

// Logging middleware
app.use(morgan("dev"));

app.use(json());

// Connect to MongoDB
connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("Mongo connected"))
  .catch(err => { console.error(err); process.exit(1); });

// Routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));
