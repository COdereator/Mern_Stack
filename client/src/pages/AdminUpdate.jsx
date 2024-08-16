import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Store/Auth";
import { useParams } from "react-router-dom";
import Image from "../assets/dark.avif";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminUpdate = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();
  const param = useParams();
  // console.log("params ", param);
  const { authorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/admin/${param.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("User Single Data : ", data);
      setUser(data);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/admin/edit/${param.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        toast.success("Update SuccessFully");
        navigate("/admin/user");
      }
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <>
      <div className="register" style={{ background: "black", height: "75vh" }}>
        <div className="register_left">
          <img src={Image} height={"90%"} alt="" />
        </div>
        <div className="register_right" style={{ marginBottom: "50px" }}>
          <form onSubmit={updateUser}>
            <h1>Update Data</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="username"
              name="username"
              placeholder="Enter your username"
              onChange={handleInput}
              value={user.username}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInput}
              value={user.email}
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              id="phone"
              className="phone"
              name="phone"
              placeholder="Enter your phone"
              onChange={handleInput}
              value={user.phone}
            />
            <input type="submit" value="Update Data" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminUpdate;
