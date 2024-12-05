import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Import Auth Context
import apiRequest from "../../utils/apiRequest";
import "./profile.scss";

function Profile() {
  const { user, logout } = useAuth(); // Get the current user and logout function from AuthContext
  const [showConfirm, setShowConfirm] = useState(false); // State to manage confirmation modal

  const handleLogout = async () => {
    try {
      // Call the backend logout API
      await apiRequest.post("/auth/logout");
      // Perform logout in the frontend
      logout();
      alert("Logout Successful");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="profile1">
        <div className="container">
          <div className="title">PROFILE</div>
          <p>No user data available. Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile1">
      <div className="container">
        <div className="header">
          <div className="title">PROFILE</div>
          <button className="logout-button" onClick={() => setShowConfirm(true)}>
            Logout
          </button>
        </div>
        <table className="profile-table">
          <tbody>
            <tr>
              <td className="label">Username</td>
              <td>{user.username || "N/A"}</td>
            </tr>
            <tr>
              <td className="label">Best Score</td>
              <td>{user.bestScore || "N/A"}</td>
            </tr>
            <tr>
              <td className="label">Rank</td>
              <td>{user.rank || "N/A"}</td>
            </tr>
          </tbody>
        </table>

        {showConfirm && (
          <div className="confirm-logout">
            <div className="confirm-dialog">
              <p>Are you sure you want to log out?</p>
              <button className="confirm-btn" onClick={handleLogout}>
                Confirm Logout
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
