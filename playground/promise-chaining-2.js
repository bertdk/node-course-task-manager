require("../src/db/mongoose");
const Task = require("../src/models/tasks");

// Task.findByIdAndDelete("5f0c229e4ab1509d3b8868da")
//   .then((task) => {
//     console.log("Task deleted");
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log("Incomplete tasks found");
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const idAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const countTask = await Task.countDocuments({ completed: false });
  return countTask;
};

idAndCount("5f0c40a7efb083a03cbf3fa9")
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.log(e);
  });
