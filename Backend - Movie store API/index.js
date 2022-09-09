const express = require("express");
const { connection, MovieModel } = require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/movies", async (req, res) => {
  const data = await MovieModel.find({ title: "dhoom" });
  res.send(data);
});

app.get("/moviesD", async (req, res) => {
  const data = await MovieModel.find({}, { _v: 0 });
  res.send(data);
});

app.get("/moviesM", async (req, res) => {
  const params = req.query;
  console.log(params);
  const data = await MovieModel.find(params, { _v: 0 });
  res.send(data);
});

app.get("/moviesS", async (req, res) => {
  const { pageNo, perPage } = req.query;

  const data = await MovieModel.find({}, { _v: 0 })
    .skip((pageNo - 1) * perPage)
    .limit(perPage);
  res.send(data);
});

app.post("/movies", async (req, res) => {
  const data = await MovieModel(req.body);
  await data.save();
  res.send(data);
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connection successful");
  } catch {
    console.log("connection failed");
  }
  console.log("listening on port 8080");
});
