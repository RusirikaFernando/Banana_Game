import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./lib/db.js"; // Import the DB connection
import authRoute from "./routes/auth.route.js";
import userscore from "./routes/user.route.js";
import http from "http";
import { initializeSocket } from "./services/socket.js"; // Import the socket initializer

 
/**
 *  @function
 * @description Initializes the Express application and sets up middleware and routes.
 */
 
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
initializeSocket(server);  // Pass the server to the socket initialization

 
// Connect to MongoDB
connectDB();
 
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
 
app.use("/api/auth", authRoute);
app.use("/add-score",userscore); // ?

 
// Start the server
server.listen(8800, () => {
  console.log("Server running on http://localhost:8800");
});