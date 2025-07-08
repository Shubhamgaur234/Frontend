import React, { useState } from "react";

const AddEmployee = () => {
  const [form, setForm] = useState({ name: "", email: "", status: "" });
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const validate = () => {
    const errors = {};
    if (!form.name) errors.name = "Name is required";
    if (!form.email) errors.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errors.email = "Invalid email";
    if (!form.status) errors.status = "Status is required";
    return errors;
  };

  const errors = validate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, status: true });
    if (Object.keys(errors).length > 0) return;
    setError("");
    setSuccess("");
    try {
      // Simulate backend: store in localStorage
      const localEmployees = localStorage.getItem("employees");
      const employees = localEmployees ? JSON.parse(localEmployees) : [];
      const newEmployee = { ...form, id: Date.now() };
      employees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(employees));
      setSuccess("Employee added successfully!");
      setForm({ name: "", email: "", status: "" });
    } catch (err) {
      setError("Failed to add employee");
    }
  };

  return (
    <div className="blur-card" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
          style={{ width: "100%", padding: 8 }}
        />
        {touched.name && errors.name && (
          <div style={{ color: "red" }}>{errors.name}</div>
        )}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          style={{ width: "100%", padding: 8 }}
        />
        {touched.email && errors.email && (
          <div style={{ color: "red" }}>{errors.email}</div>
        )}
        <input
          name="status"
          value={form.status}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Status"
          style={{ width: "100%", padding: 8 }}
        />
        {touched.status && errors.status && (
          <div style={{ color: "red" }}>{errors.status}</div>
        )}
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Add Employee
        </button>
        {success && (
          <div style={{ color: "green", marginTop: 12 }}>{success}</div>
        )}
        {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      </form>
    </div>
  );
};

export default AddEmployee;
