import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return;
    }
    try {
      const res = await fetch("/employees.json");
      const employees = await res.json();
      const exists = employees.find(
        (emp) => emp.username.toLowerCase() === form.username.toLowerCase()
      );
      if (exists) {
        setError("Username already exists. Please choose another.");
        return;
      }
      // Simulate registration by adding to localStorage (since we can't write to employees.json from frontend)
      const newEmployees = [
        ...employees,
        { username: form.username, password: form.password },
      ];
      localStorage.setItem("employees", JSON.stringify(newEmployees));
      setSuccess("Registration successful! Redirecting to login...");
      setForm({ username: "", password: "" });
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError("Error during registration.");
    }
  };

  return (
    <div className="blur-card-wrapper">
      <div className="blur-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Username:</label>
            <br />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Password:</label>
            <br />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "green", marginBottom: 12 }}>{success}</div>
          )}
          <button type="submit" style={{ width: "100%", padding: 10 }}>
            Register
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
