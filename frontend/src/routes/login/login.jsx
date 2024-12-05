import "./login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const { login } = useAuth(); // Access the login function from context
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login Successful");
        setMessageType("success");
        
        // Save the user data into localStorage and use the context's login function
        login(data.user); // Use the login function to set the user in context
        console.log(data.user);

        // Navigate to the /home page
        navigate("/home");
      } else {
        setMessage(data.message || "Login Failed");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred during login");
      setMessageType("error");
    }
  };

  return (
    <div className="login">
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
