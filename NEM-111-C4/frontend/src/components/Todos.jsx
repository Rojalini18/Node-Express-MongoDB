import React, { useEffect } from "react";

const Todos = () => {
  const token = localStorage.getItem("token");

  const getTodos = () => {
    fetch("https://gentle-forest-73691.herokuapp.com/todos/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTodos();
  }, []);
  if (!token) {
    return <h3>Please login again</h3>;
  }
  return <h1>Todos page</h1>;
};

export { Todos };
