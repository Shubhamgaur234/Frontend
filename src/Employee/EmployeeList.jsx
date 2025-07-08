import React, { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    try {
      const localEmployees = localStorage.getItem("employees");
      let employees = localEmployees ? JSON.parse(localEmployees) : [];
      // Filter by searchKey
      if (searchKey) {
        employees = employees.filter(
          (emp) =>
            (emp.name &&
              emp.name.toLowerCase().includes(searchKey.toLowerCase())) ||
            (emp.email &&
              emp.email.toLowerCase().includes(searchKey.toLowerCase()))
        );
      }
      // Filter by status
      if (status) {
        employees = employees.filter((emp) => emp.status === status);
      }
      // Show newest first
      employees = employees.slice().reverse();
      setEmployees(employees);
    } catch (err) {
      setError("Failed to load employees");
    }
    setLoading(false);
  }, [searchKey, status]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <button
          className="primary-btn"
          onClick={() => (window.location.href = "/add-employee")}
        >
          Add Employee
        </button>
        <input
          className="search-input"
          placeholder="Search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          style={{ maxWidth: 220 }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ maxWidth: 180 }}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", marginTop: 16 }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.status}</td>
                <td>
                  <button
                    onClick={() =>
                      (window.location.href = `/employee/${emp.id}`)
                    }
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/employee/${emp.id}/edit`)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default EmployeeList;
