// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');  // Import your Todo model

// Route to get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new todo
router.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({ title, description });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a todo
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a todo
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
