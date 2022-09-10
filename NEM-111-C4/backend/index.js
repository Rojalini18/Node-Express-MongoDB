const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userController = require("./routes/user.routes");
const todoController = require("./routes/todo.routes");
const authentication = require("./middlewares/authentication");
require("dotenv").config()

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/user", userController);

app.use(authentication);

app.use("/todos", todoController);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connnected to db successfully");
  } catch (err) {
    console.log("Error connecting to db");
    console.log(err);
  }
  console.log(`listening on port ${process.env.PORT}`);
});
