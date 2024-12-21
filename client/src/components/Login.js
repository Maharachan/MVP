import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apis/apiClient.js";
import "./Login.css";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already authenticated on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/admin"); // Redirect to admin page if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post("/admin/login", credentials);

      if (response.status === 200) {
        localStorage.setItem("isAuthenticated", "true"); // Set authentication
        navigate("/admin"); // Redirect to admin page on success
      } else {
        setError(response.data.message); // Display error message from backend
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      <h2>ADMIN LOGIN</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
