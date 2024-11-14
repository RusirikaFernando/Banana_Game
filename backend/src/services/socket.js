// services/socket.js or socket/socket.js
import { Server } from "socket.io";
import { Scoreboard } from "../models/scoreboard.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // Handle socket connection
  io.on("connection", (socket) => {
    console.log("New user connected via socket:", socket.id);

    // Listen for 'fetchScoreboard' event and send updated scoreboard to client
    socket.on("fetchScoreboard", async () => {
      try {
        const scoreboard = await Scoreboard.find().sort({ score: -1 });
        socket.emit("scoreboardData", scoreboard); // Emit the scoreboard data to the client
      } catch (error) {
        console.error("Error fetching scoreboard:", error);
        socket.emit("error", "Failed to fetch scoreboard");
      }
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};  