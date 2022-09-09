const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readdir("./", (err, files) => {
      res.setHeader("content-type", "text/html");
      files.forEach((item) => {
        res.write(`<a href={/${item}} ><li>${item}</li></a>`);
        console.log(item);
      });
      res.end("this is public directory");
    });
  }

  if (req.url === "/public") {
    fs.readdir("./public", (err, files) => {
      res.setHeader("content-type", "text/html");
      files.forEach((item) => {
        res.write(item);
        console.log(item);
      });
      res.end("this is public directory");
    });
  }
  if (req.url === "/public/other") {
    fs.readdir("./public/other", (err, files) => {
      res.setHeader("content-type", "text/html");
      files.forEach((item) => {
        res.write(item);
        console.log(item);
      });
      res.end("this is public directory");
    });
  }
});

server.listen(8080, () => {
  console.log("listening to port 8080");
});
