const express = require("express");
const Task = require("../models/tasks");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      owner: req.user._id,
    });
    // Getting the tasks can also be done with populate:
    // const tasks = await req.user.populate("tasks").execPopulate()
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // We also need to check if the task is created by the current user (owner)
    // const task = await Task.findById(_id);
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updating = Object.keys(req.body);
  const canUpdate = ["description", "completed"];

  const isValid = updating.every((update) => {
    return canUpdate.includes(update);
  });
  if (!isValid) {
    res.status(400).send({ error: "Invalid update field" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }
    updating.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
