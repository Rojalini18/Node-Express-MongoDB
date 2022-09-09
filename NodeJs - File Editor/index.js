let fs = require("fs");
let myargs = process.argv.splice(2);
console.log(myargs);

const path = require("path");

if (myargs[0] == "read") {
  fs.readFile(
    path.join(".", "test.txt"),
    { encoding: "utf-8" },
    (err, data) => {
      if (err) console.error(err);

      console.log(data);
    }
  );
} else if (myargs[0] == "append") {
  fs.appendFile(path.join(".", "test.txt"), "happy", (err, data) => {
    if (err) {
      console.error("ERROR", err);
    } else {
      console.log("appended sucessfully");
    }
  });
} else if (myargs[0] === "delete") {
  fs.unlink(path.join(".", "test.txt"), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("successfully file deleted");
    }
  });
} else if (myargs[0] == "create") {
  fs.writeFile("test.txt", "hello new world", (err) => {
    if (err) {
      console.error(err);
    }
  });
} else if (myargs[0] == "rename") {
  fs.rename("./test.txt", "new.txt", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("file renamed");
    }
  });
}
