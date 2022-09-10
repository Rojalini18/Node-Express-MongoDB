import React, { useState, useEffect } from "react";

const Notes = () => {
  const token = localStorage.getItem("token");

  const getNotes = () => {
    fetch("http://localhost:8000/notes/", {
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
    getNotes();
  }, []);
  if (!token) {
    return <h3>Please login again</h3>;
  }
  return <h1>Notes page</h1>;
};

export { Notes };
