import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const isEdit = location.pathname.endsWith("/edit");
  const [employee, setEmployee] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError("");
    try {
      const localEmployees = localStorage.getItem("employees");
      const employees = localEmployees ? JSON.parse(localEmployees) : [];
      const found = employees.find((emp) => String(emp.id) === String(id));
      if (!found) throw new Error("Employee not found");
      setEmployee(found);
      setEditForm(found);
    } catch (err) {
      setError("Failed to load employee");
    }
  }, [id]);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const localEmployees = localStorage.getItem("employees");
      let employees = localEmployees ? JSON.parse(localEmployees) : [];
      employees = employees.map((emp) =>
        String(emp.id) === String(id) ? { ...emp, ...editForm } : emp
      );
      localStorage.setItem("employees", JSON.stringify(employees));
      setEmployee(editForm);
      setSuccess("Employee updated successfully!");
    } catch (err) {
      setError("Failed to update employee");
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!employee) return <div>Loading...</div>;

  return (
    <div className="blur-card" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Employee Details</h2>
      {isEdit ? (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={editForm.name}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            name="email"
            value={editForm.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <input
            name="status"
            value={editForm.status}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <button type="submit" style={{ width: "100%", padding: 10 }}>
            Save
          </button>
          {success && (
            <div style={{ color: "green", marginTop: 8 }}>{success}</div>
          )}
        </form>
      ) : (
        <div>
          <div>
            <strong>Name:</strong> {employee.name}
          </div>
          <div>
            <strong>Email:</strong> {employee.email}
          </div>
          <div>
            <strong>Status:</strong> {employee.status}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
