import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Authcontext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {logout} = useAuth();

  // ✅ Check login
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Logout function
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          My<span className="text-danger">App</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>

            {/* 👇 If NOT logged in */}
            {!token && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/signup" ? "active-link" : ""}`}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/login" ? "active-link" : ""}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* 👇 If logged in */}
            {token && (
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <span className="user-badge">
                    Hi, {user?.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>

                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/hello" ? "active-link" : ""}`}
                    to="/hello"
                  >
                    Hello
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;