import React, { useEffect, useState } from "react";
import { useAuth } from "../Store/Auth";
import { MdDeleteForever, MdOutlineBrowserUpdated } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
const AdminContact = () => {
  const [contact, setContact] = useState([]);

  const { authorizationToken } = useAuth();

  const getContactData = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/contact", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContact(data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/admin/contactdelete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // console.log("After Delete : " + contact);
        // toast.success("Delete Successfully");
        setContact(contact.filter((cont) => cont._id !== id));
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  return (
    <div className="container">
      <div className="heading">
        <h1>Admin Contact Data</h1>
      </div>
      <div className="admin-users">
        <table className="table" cellPadding="10" cellSpacing="5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {contact.length > 0
              ? contact.map((cont) => {
                  return (
                    <>
                      <tr key={cont._id}>
                        <td>{cont.username}</td>
                        <td>{cont.email}</td>

                        <td>
                          <NavLink to={`/admin/edit/${cont._id}`}>
                            <button className="btn btn-primary">
                              <MdOutlineBrowserUpdated />
                            </button>
                          </NavLink>
                        </td>
                        <td>
                          <button onClick={() => deleteContact(cont._id)}>
                            <MdDeleteForever />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })
              : console.log("No Data in the Database")}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContact;
