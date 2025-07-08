import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import EmployeeList from "./Employee/EmployeeList";
import EmployeeDetails from "./Employee/EmployeeDetails";
import AddEmployee from "./Employee/AddEmployee";
import Profile from "./Employee/Profile";
import Navbar from "./Navbar";

const RequireAuth = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.username) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

const ProtectedLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/employee/:id/edit" element={<EmployeeDetails />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
