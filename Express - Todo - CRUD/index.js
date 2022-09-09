const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET--->

app.get("/", (req, res) => {
  fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.send("error");
    }
    const parsedData = JSON.parse(data);
    const todos = parsedData.todos;
    res.send(JSON.stringify(todos));
  });
});

//POST---->

app.post("/", (req, res) => {
  const client_data = req.body;
  fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log("error reading file");
    }
    const parsedData = JSON.parse(data);
    parsedData.todos = [...parsedData.todos, client_data];

    fs.writeFile(
      "./data.json",
      JSON.stringify(parsedData),
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          res.send("error occured");
        }
        res.send("message added successfully");
      }
    );
  });
});

//PUT--->

app.put("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
    const parsed = JSON.parse(data);
    parsed.todos = parsed.todos.map((el) => (el.id == id ? req.body : el));
    fs.writeFile(
      "./data.json",
      JSON.stringify(parsed),
      "utf-8",
      (err, data) => {
        if (err) {
          console.log("error while writing");
        }

        res.send("todo sucessfully replaced");
      }
    );
  });
});

//DELETE----->

app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
    const parsedData = JSON.parse(data);

    const todos = parsedData.todos;
    const remainingtodos = todos.filter((todo) => todo.id !== id);

    parsedData.todos = remainingtodos;

    fs.writeFile(
      "./data.json",
      JSON.stringify(parsedData),
      { encoding: "utf-8" },
      () => {
        res.send(`todo ${id} was deleted`);
      }
    );
  });
});

app.listen(5000, () => {
  console.log("listening to server...on port 5000");
});
