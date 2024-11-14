import React, { useEffect, useState } from "react";
import io from "socket.io-client";
 
const SOCKET_SERVER_URL = "http://localhost:8800"; 
 
const Scoketboard = () => {
  const [scoreboard, setScoreboard] = useState([]);
 
  useEffect(() => {
    // Connect to the Socket.io server without authentication
    const socket = io(SOCKET_SERVER_URL);
 
    // Emit event to request the scoreboard data initially
    socket.emit("fetchScoreboard");
 
    // Listen for the 'scoreboardData' event and update state when new data arrives
    socket.on("scoreboardData", (data) => {
      setScoreboard(data);
    });
 
    // Refresh the scoreboard every 2 seconds by emitting the fetch event again
    const intervalId = setInterval(() => {
      socket.emit("fetchScoreboard");
    }, 2000); // 2-second interval
 
    // Cleanup when the component unmounts (disconnect from the server and clear interval)
    return () => {
      socket.disconnect();
      clearInterval(intervalId); // Clear the interval to prevent memory leaks
    };
  }, []);
 
  return (
    <div>
      <h1>Real-Time Scoreboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {scoreboard.map((entry) => (
            <tr key={entry.userId}>
              <td>{entry.username}</td>
              <td>{entry.score}</td>
              <td>{entry.rank || "Unranked"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default Scoketboard;