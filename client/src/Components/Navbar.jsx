import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Store/Auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className="navbar">
        <div className="logo">Project-01</div>
        <div className="content">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/logout">Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
