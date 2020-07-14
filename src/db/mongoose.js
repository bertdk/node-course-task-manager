const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
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
