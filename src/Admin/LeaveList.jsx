import React, { useEffect, useState } from "react";

const LeaveList = ({ isAdmin }) => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    const fetchLeaves = async () => {
      setError("");
      try {
        const params = new URLSearchParams({ search, status });
        const res = await fetch(`/api/leaves?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch leaves");
        const data = await res.json();
        setLeaves(data.leaves || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLeaves();
  }, [search, status, token]);

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`/api/leaves/${id}/${action}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to update leave status");
      setLeaves(
        leaves.map((l) =>
          l.id === id
            ? { ...l, status: action === "approve" ? "approved" : "rejected" }
            : l
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Leave List</h2>
      <input
        placeholder="Search reason"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginRight: 8 }}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: 16 }}
      >
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Reason</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
              <td>
                <span
                  title={leave.reason}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline dotted",
                  }}
                >
                  {leave.reason.length > 20
                    ? leave.reason.slice(0, 20) + "..."
                    : leave.reason}
                </span>
              </td>
              {isAdmin && (
                <td>
                  {leave.status === "pending" && (
                    <span>
                      <button onClick={() => handleAction(leave.id, "approve")}>
                        Approve
                      </button>
                      <button onClick={() => handleAction(leave.id, "reject")}>
                        Reject
                      </button>
                    </span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
