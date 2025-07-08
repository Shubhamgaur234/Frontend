import React, { useState } from "react";

const ApplyLeave = () => {
  const [form, setForm] = useState({ startDate: "", endDate: "", reason: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.startDate || !form.endDate || !form.reason) {
      setError("All fields are required.");
      return;
    }
    try {
      // Replace with your real API endpoint
      const res = await fetch("/api/leaves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to apply for leave");
      setSuccess("Leave applied successfully!");
      setForm({ startDate: "", endDate: "", reason: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Apply for Leave</h2>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <textarea
        name="reason"
        value={form.reason}
        onChange={handleChange}
        placeholder="Reason"
        style={{ width: "100%", marginBottom: 12 }}
      />
      <button type="submit" style={{ width: "100%", padding: 10 }}>
        Apply
      </button>
      {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
};

export default ApplyLeave;
