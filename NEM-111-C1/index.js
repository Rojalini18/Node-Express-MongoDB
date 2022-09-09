const express = require("express");
const fs = require("fs");
const dns = require("dns");
const app = express();
app.use(express.json());

//Question-1

app.post("/getmeip", (req, res) => {
  console.log(req.body);
  const p_data = req.body;
  const url = p_data.website_name;
  console.log(p_data.website_name);
  dns.resolve(url, (err, data) => {
    if (err) throw err;
    res.send(data[0]);
  });
});

//Question-2
//GET

app.get("/products", (req, res) => {
  fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const products = parsedData.products;
    res.send(JSON.stringify(products));
  });
});

//POST

app.post("/products/create", (req, res) => {
  const postData = req.body;
  fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    parsedData.products = [...parsedData.products, postData];
    fs.writeFile("./db.json", JSON.stringify(parsedData), "utf-8", () => {
      res.send("product added successfully");
    });
  });
});

//PUT

app.put("/products/:productId", (req, res) => {
  fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    parsedData.products = [...parsedData.products, postData];
    fs.writeFile("./db.json", JSON.stringify(parsedData), "utf-8", () => {
      res.send("product modified successfully");
    });
  });
});

//DELETE

app.delete("/products/:productId", (req, res) => {
  const id = Number(req.params.productId);
  console.log(id);
  fs.readFile("./db.json", { encoding: "utf-8" }, (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    console.log(parsedData.products);
    const products = parsedData.products;
    const remaining_products = products.filter(
      (product) => product.productId !== id
    );

    parsedData.products = remaining_products;
    fs.writeFile("./db.json", JSON.stringify(parsedData), "utf-8", () => {
      res.send("product deleted successfully");
    });
  });
});

app.listen(7000, () => {
  console.log("listening on the port 7000");
});
