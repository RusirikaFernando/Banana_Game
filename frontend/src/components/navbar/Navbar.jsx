import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import Auth Context
import "./navbar.scss";

function Navbar() {
  const { user } = useAuth(); // Access current user from AuthContext

  return (
    <nav>
      <div className="left">
        <a href="/home" className="logo">
          <img src="./assets/logo.png" alt="Logo" />
          <span>B_MATH</span>
        </a>
      </div>
      <div className="right">
        {user && ( // Display user info only if logged in
          <div className="user">
            <img
              src={user.avatar || "./assets/user.jpg"} // Display avatar if available
              alt="User Avatar"
            />
            <span>{user.name || user.username}</span> {/* Display user's name or username */}
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
