const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/textsync") {
    const data = fs.readFileSync("./text.txt", { encoding: "utf-8" });
    res.end(data);
  } else if (req.url === "/textasync") {
    fs.readFile("./text.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.end(data);
      }
    });
  } else if (req.url === "/textstream") {
    const stream = fs.createReadStream("./text.txt");
    stream.pipe(res);
  } else if (req.url === "/textpromise") {
    fs.promises
      .readFile("./text.txt", { encoding: "utf-8" })
      .then((data) => {
        res.end(data);
      })
      .catch((err) => {
        res.end(err);
      });
  }
});

server.listen(4040, () => {
  console.log("listening to port 4040");
});
