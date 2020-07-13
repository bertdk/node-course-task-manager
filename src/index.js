const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are dis");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("The site is in maintance");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "acbsd32" }, "azsxftgbjiolmp", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "azsxftgbjiolmp");
  console.log(data);
};

myFunction();
