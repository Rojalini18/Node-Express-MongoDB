import React, { useState } from "react";

const Login = () => {
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
    await fetch("http://localhost:8000/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
      })
      .catch((err) => console.log(err));
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
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export { Login };
