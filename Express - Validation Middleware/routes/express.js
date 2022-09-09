const { Router } = require("express");
const fs = require("fs");
const expressValidMiddleware = Router();

//GET

expressValidMiddleware.get("/", (req, res) => {
  console.log("body", req);
  fs.readFile("./db.json", (err, data) => {
    var parsedData = JSON.parse(data);
    res.status(201).send(parsedData.movies);
  });
});

//POST

expressValidMiddleware.post("/", (req, res) => {
  if (
    typeof req.body.ID != "number" ||
    typeof req.body.Rating != "number" ||
    typeof req.body.Name != "string" ||
    typeof req.body.Description != "string" ||
    typeof req.body.Genre != "string" ||
    typeof req.body.Cast != "string"
  ) {
    res.status(400).send("Bad Request");
  } else {
    fs.readFile("./db.json", { encoding: "utf8" }, (err, data) => {
      if (err) console.log("error while reading", err);
      var parsedData = JSON.parse(data);
      parsedData.movies = [...parsedData.movies, req.body];
      fs.writeFile(
        "./db.json",
        JSON.stringify(parsedData),
        "utf-8",
        (err, data) => {
          res.status(201).send(parsedData.movies);
        }
      );
    });
  }
});

module.exports = expressValidMiddleware;
