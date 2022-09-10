import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const payload = {
      email,
      password,
    };
    await fetch("https://gentle-forest-73691.herokuapp.com/user/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={handleEmailChange}
      ></input>
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <Link to="/login">
        <button onClick={handleSubmit}>Register</button>
      </Link>
    </div>
  );
};

export { Register };
