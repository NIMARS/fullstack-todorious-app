const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let tasks = [];

//mock
app.get("/", (req, res) => {
  res.send("Task API is running");
});

// app.get("/tasks", (req, res) => {
//   res.json(tasks);
// });

app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map(t => (t.id === id ? updatedTask : t));
  res.json(updatedTask);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
