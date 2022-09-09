const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
require("dotenv").config();

const newtoken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY);
};

//Register
const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "Email already exits" });
    }
    user = await User.create(req.body);
    const token = newtoken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//login
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    //check Password
    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid Password" });
    }
    const token = newtoken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { register, login };
