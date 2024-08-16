import React, { useEffect, useState } from "react";
import { useAuth } from "../Store/Auth";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
const AdminUser = () => {
  const [users, setUser] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUser(data);
      // console.log("Users : " + data);
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("After Delete : " + data);
      toast.success("Delete Successfully");
      setUser(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Admin User Data</h1>
        </div>
        <div className="admin-users">
          <table className="table" cellPadding="10" cellSpacing="5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <>
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <NavLink to={`/admin/edit/${user._id}`}>
                          <button className="btn btn-primary">
                            <MdOutlineBrowserUpdated />
                          </button>
                        </NavLink>
                      </td>
                      <td>
                        <button onClick={() => deleteUser(user._id)}>
                          <MdDeleteForever />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUser;
