import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.username) throw new Error("User not logged in");
      const localEmployees = localStorage.getItem("employees");
      const employees = localEmployees ? JSON.parse(localEmployees) : [];
      const found = employees.find((emp) => emp.username === user.username);
      if (!found) throw new Error("Profile not found");
      setProfile(found);
      setEditForm(found);
    } catch (err) {
      setError("Failed to load profile");
    }
  }, []);

  const handleEdit = () => {
    setShowModal(true);
    setSuccess("");
    setError("");
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const localEmployees = localStorage.getItem("employees");
      let employees = localEmployees ? JSON.parse(localEmployees) : [];
      employees = employees.map((emp) =>
        emp.username === user.username ? { ...emp, ...editForm } : emp
      );
      localStorage.setItem("employees", JSON.stringify(employees));
      setProfile(editForm);
      setSuccess("Profile updated successfully!");
      setShowModal(false);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="blur-card" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>My Profile</h2>
      <div>
        <strong>Name:</strong> {profile.name}
      </div>
      <div>
        <strong>Email:</strong> {profile.email}
      </div>
      <div>
        <strong>Status:</strong> {profile.status}
      </div>
      <button onClick={handleEdit} style={{ marginTop: 16 }}>
        Edit Profile
      </button>
      {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="blur-card"
            style={{
              background: "#181c2f",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
            }}
          >
            <h3>Edit Profile</h3>
            <div style={{ marginBottom: 12 }}>
              <input
                name="name"
                value={editForm.name}
                onChange={handleChange}
                placeholder="Name"
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input
                name="email"
                value={editForm.email}
                onChange={handleChange}
                placeholder="Email"
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <input
                name="status"
                value={editForm.status}
                onChange={handleChange}
                placeholder="Status"
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <button type="submit" style={{ width: "100%", padding: 10 }}>
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={{ width: "100%", padding: 10, marginTop: 8 }}
            >
              Cancel
            </button>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
