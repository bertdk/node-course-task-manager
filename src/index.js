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

// const Task = require("./models/tasks");
// const User = require("./models/user");

// const main = async () => {
//   // Save a user in a task
//   const task = await Task.findById("5f0ca1a8dca365b1ac0c69fe");
//   await task.populate("owner").execPopulate();
//   console.log(task.owner);
//   /////////////////
//   // From a user, get all his tasks
//   const user = await User.findById("5f0ca1281888a8b17e50832d");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };

// main();
