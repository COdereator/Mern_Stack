import React from "react";
import { FaUser, FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { useAuth } from "../../Store/Auth";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import "./admin.css";
const AdminLayout = () => {
  const { users } = useAuth();

  // if (!users.isAdmin) {
  //   <Navigate to="/" />;
  // }

  return (
    <>
      <div className="container">
        <div className="nav">
          <ul type="none">
            <li>
              <FaUser />
              <NavLink to="/admin/user">
                <p>User</p>
              </NavLink>
            </li>
            <li>
              <FaMessage />
              <NavLink to="/admin/contact">
                <p>Contact</p>
              </NavLink>
            </li>
            <li>
              <GrServices />
              <NavLink to="/services">
                <p>Services</p>
              </NavLink>
            </li>
            <li>
              <FaHome />
              <NavLink to="/">
                <p>Home</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
