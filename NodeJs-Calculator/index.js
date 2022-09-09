let crypto = require("crypto");
let myargs = process.argv.slice(2);

function add(a, b) {
  console.log(Number(a) + Number(b));
}
function mul(a, b) {
  console.log(Number(a) * Number(b));
}
function div(a, b) {
  console.log(Number(a) / Number(b));
}
function sub(a, b) {
  console.log(Number(a) - Number(b));
}
function sin(a) {
  console.log(Math.sin(a));
}
function cos(a) {
  console.log(Math.cos(a));
}
function tan(a) {
  console.log(Math.tan(a));
}
function random() {
  console.log(crypto.randomInt(100));
}

let x = myargs[0];

switch (x) {
  case (x = "add"): {
    add(myargs[1], myargs[2]);
    break;
  }
  case (x = "mul"): {
    mul(myargs[1], myargs[2]);
    break;
  }
  case (x = "div"): {
    div(myargs[1], myargs[2]);
    break;
  }
  case (x = "sub"): {
    sub(myargs[1], myargs[2]);
    break;
  }
  case (x = "sin"): {
    sin(myargs[1]);
    break;
  }
  case (x = "cos"): {
    cos(myargs[1]);
    break;
  }
  case (x = "tan"): {
    tan(myargs[1]);
    break;
  }
  case (x = "random"): {
    random();
    break;
  }
  default: {
    console.log("not valid");
  }
}
