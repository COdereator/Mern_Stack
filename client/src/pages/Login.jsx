import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Store/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/router/login", {
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
        setUser({ email: "", password: "" });
        toast.success("Login Successfull");
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
      console.log(response);
    } catch (err) {
      console.log("register", err);
      toast("Error", err);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login_right">
          <form onSubmit={handleSubmit}>
            <h1>Login Form</h1>
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
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
