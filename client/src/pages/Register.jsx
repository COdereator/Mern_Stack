import { useState } from "react";
import Image from "../assets/Register-Back.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/router/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // get the token
        const res_data = await response.json();
        console.log(res_data);
        // set the token to the local storage
        storetokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      }
      console.log(response);
    } catch (err) {
      console.log("register", err);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register_left">
          <img src={Image} height={"100%"} alt="" />
        </div>
        <div className="register_right">
          <form onSubmit={handleSubmit}>
            <h1>Registration Form</h1>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInput}
              value={user.password}
            />
            <input type="submit" value="Register Now" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
