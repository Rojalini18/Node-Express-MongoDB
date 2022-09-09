const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/posts", (req, res) => {
  fs.readFile("./posts.json", "utf-8", (err, data) => {
    res.json(JSON.parse(data));
  });
});

app.post("/posts/create", (req, res) => {
  fs.readFile("./posts.json", "utf-8", (err, data) => {
    const parsed = JSON.parse(data);
    parsed.posts = [...parsed.posts, req.body];
    fs.writeFile(
      "./posts.json",
      JSON.stringify(parsed),
      "utf-8",
      (err, data) => {
        res.send("Post Added successfully");
      }
    );
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./posts.json", "utf-8", (err, data) => {
    const parsed = JSON.parse(data);
    parsed.posts = parsed.posts.filter((t) => t.id != id);
    fs.writeFile("./posts.json", JSON.stringify(parsed), "utf-8", () => {
      res.send("post deleted successfully");
    });
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./posts.json", "utf-8", (err, data) => {
    const parsed = JSON.parse(data);
    parsed.posts = parsed.posts.map((t) => (t.id == id ? (t = req.body) : t));
    fs.writeFile("./posts.json", JSON.stringify(parsed), "utf-8", () => {
      res.send("post updated successfully");
    });
  });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
