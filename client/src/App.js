import logo from "./logo.svg";
import Task from "./components/Task";

import "./App.css";
import React, { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api.js";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("none");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            text: "Finish fullstack app",
            completed: false,
            priority: "common",
          },
          { id: 2, text: "Feed the cat", completed: true, priority: "rare" },
        ];
  });

  const handleAddTask = async (text, priority = "common") => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
    };

    const savedTask = await addTaskToServer(newTask);
    setTasks((prev) => [...prev, savedTask]);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  const [priorityFilter, setPriorityFilter] = useState(() => {
    return localStorage.getItem("priorityFilter") || "all";
  });
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "all" ||
      (filter === "active" && !task.completed) ||
      (filter === "completed" && task.completed);

    const priorityMatch =
      priorityFilter === "all" || task.priority === priorityFilter;

    const searchMatch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  //download from server-bru
  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  useEffect(() => {
    localStorage.setItem("filter", filter);
    localStorage.setItem("priorityFilter", priorityFilter);
  }, [filter, priorityFilter]);

  useEffect(() => {
    const savedFilter = localStorage.getItem("filter");
    const savedPriority = localStorage.getItem("priorityFilter");

    if (savedFilter) setFilter(savedFilter);
    if (savedPriority) setPriorityFilter(savedPriority);
  }, []);

  //edit task
  const handleEditTask = async (id, newText) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, text: newText };
    const savedTask = await updateTaskOnServer(id, updatedTask);

    setTasks((prev) => prev.map((t) => (t.id === id ? savedTask : t)));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedItem);

    setTasks(updatedTasks);
  };

  //change priority
  const handleEditPriority = (id, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  //buttons
  const handleClearAll = () => {
    setTasks([]);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const handleResetCompleted = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: false })));
  };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "priority") {
      const priorityOrder = { ultra: 3, rare: 2, common: 1 };
      return (
        (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
      );
    }
    if (sortOption === "alphabetical") {
      return a.text.localeCompare(b.text);
    }
    if (sortOption === "completed") {
      return a.completed - b.completed;
    }
    return 0;
  });

  return (
    <div className="App">
      <h1>Todo App</h1>

      <AddTaskForm onAdd={handleAddTask} />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && <button onClick={() => setSearchTerm("")}>Clear</button>}
      </div>

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <div className="sort-options">
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">None (Manual)</option>
          <option value="priority">Priority</option>
          <option value="alphabetical">Alphabetical (A-Z)</option>
          <option value="completed">Status (Incomplete First)</option>
          <option value="dateAsc">Date (Oldest First)</option>
          <option value="dateDesc">Date (Newest First)</option>
        </select>
      </div>

      <div className="priority-filter">
        <label>Filter by priority:</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="ultra">Ultraimportant</option>
        </select>
      </div>

      <div className="control-buttons">
        <button onClick={handleClearAll}>Clear All</button>
        <button onClick={handleClearCompleted}>Clear Completed</button>
        <button onClick={handleResetCompleted}>Reset All to Incomplete</button>
      </div>

      <TaskList
        tasks={sortedTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onEditPriority={handleEditPriority}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default App;
