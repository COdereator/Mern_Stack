import React from "react";
import { useAuth } from "../Store/Auth";

const About = () => {
  const { users } = useAuth();
  return (
    <div>
      <h1>Welcome {users ? users.username : `to our website`}</h1>
    </div>
  );
};

export default About;
