const express = require("express");
const app = express();
const expressValidMiddleware = require("./routes/express");

const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use(
  morgan(
    ':method - :url - :status -  :res[content-length] - :response-time ms  - [:date[clf]] - ":method :url HTTP/:http-version" '
  )
);

app.get("/", (req, res) => {
  res.send("Hey there Home page");
});

app.use((req, res, next) => {
  if (req.method === "POST") {
    if (
      (!req.body["ID"] && !req.body["Name"]) ||
      !req.body["Rating"] ||
      !req.body["Description"] ||
      !req.body["Genre"] ||
      !req.body["Cast"]
    ) {
      return res.status(404).send({ message: "Bad request" });
    }
  }
  next();
});

app.use("/movies", expressValidMiddleware);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
