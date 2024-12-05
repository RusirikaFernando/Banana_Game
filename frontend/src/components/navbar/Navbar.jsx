import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

function Navbar() {
  // Test state for user
  const [user] = useState({ name: "John Doe" });

  return (
    <nav>
      <div className="left">
        <a href="/home" className="logo">
          <img src="./assets/logo.png" alt="" />
          <span>B_MATH</span>
        </a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img src="./assets/user.jpg" alt="" />
            <span>{user.name}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/">Sign in</a>
            <a href="/" className="register">Sign up</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
