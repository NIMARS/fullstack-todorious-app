export function filterTasks(tasks, filter, priorityFilter, searchTerm) {
    return tasks.filter((task) => {
      const statusMatch =
        filter === "all" ||
        (filter === "active" && !task.completed) ||
        (filter === "completed" && task.completed);
  
      const priorityMatch =
        priorityFilter === "all" || task.priority === priorityFilter;
  
      const searchMatch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
  
      return statusMatch && priorityMatch && searchMatch;
    });
  }
  
  export function sortTasks(tasks, sortOption) {
    const sorted = [...tasks];
    if (sortOption === "priority") {
      const priorityOrder = { ultra: 3, rare: 2, common: 1 };
      return sorted.sort((a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0));
    }
    if (sortOption === "alphabetical") {
      return sorted.sort((a, b) => a.text.localeCompare(b.text));
    }
    if (sortOption === "completed") {
      return sorted.sort((a, b) => a.completed - b.completed);
    }
    if (sortOption === "dateAsc") {
      return sorted.sort((a, b) => a.id - b.id);
    }
    if (sortOption === "dateDesc") {
      return sorted.sort((a, b) => b.id - a.id);
    }
    return sorted;
  }
