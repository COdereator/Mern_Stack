import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Store/Auth";

const Contact = () => {
  // handling the user for storing the data
  const [user, setUser] = useState({
    username: "",
    email: "",
    address: "",
  });

  const [userData, setUserData] = useState(true);
  const { users } = useAuth();

  if (userData && users) {
    setUser({
      username: users.username,
      email: users.email,
      message: "",
    });
    setUserData(false);
  }

  const navigate = useNavigate();
  // store data from the input
  
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the event at submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        setUser({ username: "", email: "", address: "" });
        navigate("/services");
      }
      console.log(response);
    } catch (err) {
      console.log("register", err);
    }
  };

  return (
    <div>
      <div
        className="login"
        style={{
          backgroundImage:
            "url('https://images2.alphacoders.com/133/1339621.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="login_right">
          <form onSubmit={handleSubmit}>
            <h1
              style={{
                textShadow: "3px 3px 3px black",
                position: "absolute",
                left: "57%",
                top: "35%",
                fontSize: "8rem",
              }}
            >
              Contact
            </h1>
            <label htmlFor="Username" style={{ marginTop: "100px" }}>
              Username
            </label>
            <input
              type="username"
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
              placeholder="Enter your Email"
              onChange={handleInput}
              value={user.email}
            />
            <label htmlFor="address">Address</label>
            <textarea
              cols="56"
              rows="7"
              id="address"
              className="address"
              name="address"
              placeholder="Enter your address"
              onChange={handleInput}
              value={user.address}
            ></textarea>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
