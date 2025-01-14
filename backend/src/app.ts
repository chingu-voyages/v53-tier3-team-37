import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";

const app = express();

const port = process.env.PORT || 3000; // will set the port based on the environment, if there is something set

app.use(express.json());

// CORS

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET, POST, PATCH, DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// confirm postman connection for testing

app.get("/", (req, res) => {
  res.json({
    message: "Server is running -- Connection established successfully",
  });
});

app.use("/auth", authRouter);
