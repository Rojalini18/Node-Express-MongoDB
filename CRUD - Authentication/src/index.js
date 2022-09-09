const express = require("express");
const mongoose = require("mongoose");
const connect = require("./configs/db");
const app = express();
app.use(express.json());

const userController = require("./controllers/user-controller");
app.use("/users", userController);
const { register, login } = require("./controllers/auth-controller");
const productController = require("./controllers/product-controller");

app.post("/register", register);
app.post("/login", login);
app.use("/products", productController);
app.listen(5000, async () => {
  try {
    await connect();
    console.log("Listenig on Port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
