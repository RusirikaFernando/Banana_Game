// src/Profile.jsx
import React from "react";
import "./profile.scss";
import profileData from "./profileData";

function Profile() {
  return (
    <div className="profile1">
      <div className="container">
        <div className="title">PROFILE</div>
        <table className="profile-table">
          <tbody>
            <tr>
              <td className="label">Username</td>
              <td>{profileData.username}</td>
            </tr>
            <tr>
              <td className="label">Level</td>
              <td>{profileData.level}</td>
            </tr>
            <tr>
              <td className="label">Rank</td>
              <td>{profileData.rank}</td>
            </tr>
            <tr>
              <td className="label">Best Score</td>
              <td>{profileData.bestScore}</td>
            </tr>
            <tr>
              <td className="label">Games Played</td>
              <td>{profileData.gamesPlayed}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;

