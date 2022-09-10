const express = require("express");

const TodoModel = require("../models/Todo.model");

const todoController = express.Router();

todoController.post("/create", async (req, res) => {
  const { taskname, status, tag, userId } = req.body;
  const new_todo = new TodoModel({
    taskname,
    status,
    tag,
    userId,
  });
  await new_todo.save();
  res.send({ message: "task created", new_todo });
});

todoController.get("/", async (req, res) => {
  const { userId } = req.body;
  const todos = await TodoModel.find({ userId });
  res.send(todos);
});

todoController.patch("/:todoId/edit", async (req, res) => {
  const { todoId } = req.params;
  const { userId } = req.body;
  const todo = await TodoModel.findOne({ _id: todoId });

  if (todo.userId === userId) {
    const new_todo = await TodoModel.findOneAndUpdate(
      { _id: todoId },
      req.body,
      { new: true }
    );
    return res.send({ message: "successfully updated", new_todo });
  } else {
    return res.send("you are not authorised to do it");
  }
});

todoController.delete("/:todoId/delete", async (req, res) => {
  const { todoId } = req.params;
  const { userId } = req.body;
  const todo = await TodoModel.findOne({ _id: todoId });

  if (todo.userId === userId) {
    await TodoModel.findOneAndDelete({ _id: todoId });
    return res.send({ message: "successfully deleted" });
  } else {
    return res.send("you are not authorised to do it");
  }
});

module.exports = todoController;
