import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables.
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend URL before any routes or middleware
app.use(
	cors({
		origin: "http://localhost:5173",  // frontend port from vite config
		credentials: true,                // allow cookies and credentials
	})
);

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Socket.IO server running");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
