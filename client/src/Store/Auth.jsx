import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState();
  const [contact, setContact] = useState();
  const authorizationToken = `Bearer ${token}`;

  const storetokenInLS = (servertoken) => {
    setToken(servertoken);
    return localStorage.setItem("token", servertoken);
  };

  let isLoggedIn = !!token;

  console.log(isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/router/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.userData._id);
        setUsers(data.userData);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/services", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setContact(data);
        console.log(data);
      }
    } catch (error) {
      console.log("Error", error);
    }
    // console.log(users);
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storetokenInLS,
        LogoutUser,
        users,
        contact,
        authorizationToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
