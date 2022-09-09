const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const authententicate = require("../middlewares/authentication");
router.post("", authententicate, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const products = await Product.create(req.body);
    return res.status(200).send(products);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
