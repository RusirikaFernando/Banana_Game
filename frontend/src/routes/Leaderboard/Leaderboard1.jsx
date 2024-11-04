// src/leaderboard.jsx
import React from "react";
import "./leaderboard.scss";

const Leaderboard1 = ({ data }) => {
  // Sort data by score in descending order
  const sortedData = [...data].sort((a, b) => b.score - a.score);

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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard1;
