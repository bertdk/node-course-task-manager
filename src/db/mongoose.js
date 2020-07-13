const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const me = new User({
//   name: "      Bert    ",
//   email: "bert@hotmail.com     ",
//   password: "     passWordissecret    ",
// });

// const eating = new Task({ description: "    Eat food    " });
