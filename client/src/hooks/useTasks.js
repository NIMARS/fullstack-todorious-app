import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api.js";
import { filterTasks, sortTasks } from "../utils/taskHelpers";

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("none");
    const filteredTasks = filterTasks(tasks, filter, priorityFilter, searchTerm);
    const sortedTasks = sortTasks(filteredTasks, sortOption);
    
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




  
    // handlers there! add, delete, edit, toggle, filter and something else
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
    
    
    return {
      tasks,
      sortedTasks,
      searchTerm,
      sortOption,
      priorityFilter,
      filters: { filter, priorityFilter },
      handlers: {
        handleAddTask,
        handleEditTask,
        handleDragEnd,
        handleToggleTask,
        handleDeleteTask,
        handleEditPriority,
        handleClearAll,
        handleClearCompleted,
        handleResetCompleted

      },
      setSearchTerm,
      setFilter,
      setPriorityFilter,
      setSortOption
    };
}
  