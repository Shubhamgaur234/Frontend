import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return;
    }
    try {
      let employees = [];
      const localEmployees = localStorage.getItem("employees");
      if (localEmployees) {
        employees = JSON.parse(localEmployees);
      } else {
        const res = await fetch("/employees.json");
        employees = await res.json();
      }
      const found = employees.find(
        (emp) =>
          emp.username === form.username && emp.password === form.password
      );
      if (found) {
        localStorage.setItem(
          "user",
          JSON.stringify({ username: form.username })
        );
        navigate("/employee-list");
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setError("Error during login.");
    }
  };

  return (
    <div className="blur-card-wrapper">
      <div className="blur-card">
        <h2>Login</h2>
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
          <button type="submit" style={{ width: "100%", padding: 10 }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
