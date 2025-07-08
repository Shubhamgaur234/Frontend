import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #ccc', marginBottom: 24 }}>
      <Link to="/employee-list">Employee List</Link>
      <Link to="/add-employee">Add Employee</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Logout</button>
    </nav>
  );
};

export default Navbar;
