// routes/todos.js
import { Router } from "express";
const router = Router();
import Todo from "../models/Todo.js";
import auth from "../middleware/auth.js";
import { todoValidator } from "../validators.js";
import { validationResult } from "express-validator";

// create todo
router.post("/", auth, todoValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      owner: req.user._id
    });
    await todo.save();
    return res.status(201).json(todo);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

// list todos for user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user._id });
    return res.json(todos);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

// update
router.put("/:id", auth, todoValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $set: { title: req.body.title, description: req.body.description, completed: req.body.completed } },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Not found" });
    return res.json(todo);
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

// delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const removed = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!removed) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "deleted" });
  } catch (e) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
