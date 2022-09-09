const { Router } = require("express");
const UserModel = require("../models/User");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const user = await new UserModel(req.body);
  user.save((err, success) => {
    if (err) {
      res.status(500).send({ message: "Error occurred" });
    }
    return res.status(201).send({ message: "Sign up success", token: 12345 });
  });
});

authRouter.post("/login", async (req, res) => {
  const checkUser = await UserModel.find(req.body);
  if (checkUser.length >= 1) {
    let { name, _id } = checkUser[0];
    let payload = {
      _id,
      name,
      token: 12345,
    };
    return res.send(payload);
  }
  res.send({ message: "Wrong credentials" });
});

module.exports = authRouter;
