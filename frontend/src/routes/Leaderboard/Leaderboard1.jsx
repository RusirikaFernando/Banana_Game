// src/leaderboard.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./leaderboard.scss";

const SOCKET_SERVER_URL = "http://localhost:8800"; 

const Leaderboard = () => {
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    // Connect to the Socket.io server
    const socket = io(SOCKET_SERVER_URL);

    // Emit event to request the scoreboard data initially
    socket.emit("fetchScoreboard");

    // Listen for 'scoreboardData' event and update state when new data arrives
    socket.on("scoreboardData", (data) => {
      setScoreboard(data);
    });

    // Refresh the scoreboard every 2 seconds by emitting the fetch event again
    const intervalId = setInterval(() => {
      socket.emit("fetchScoreboard");
    }, 2000); // 2-second interval

    // Cleanup when the component unmounts
    return () => {
      socket.disconnect();
      clearInterval(intervalId); // Clear the interval to prevent memory leaks
    };
  }, []);

  // Sort data by score in descending order for display
  const sortedData = [...scoreboard].sort((a, b) => b.score - a.score);

  return (
    <div className="wrapper">
      <div className="title">LeaderBoard</div>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((player, index) => (
              <tr key={player.userId || index}>
                <td>{index + 1}</td>
                <td>{player.username}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
