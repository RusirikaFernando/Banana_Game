import "./register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest"; 

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate after successful registration

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Make a POST request to the register endpoint
      await apiRequest.post("/auth/register", formData);

      // Registration successful - navigate to login page
      navigate("/login");
    } catch (err) {
      // Handle errors from the server
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
