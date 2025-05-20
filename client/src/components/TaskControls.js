import React from "react";

function TaskControls({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  sortOption,
  setSortOption,
  priorityFilter,
  setPriorityFilter,
  onClearAll,
  onClearCompleted,
  onResetCompleted
}) {
  return (
    <div className="task-controls">
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
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
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
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="common">Common</option>
          <option value="rare">Rare</option>
          <option value="ultra">Ultraimportant</option>
        </select>
      </div>

      <div className="control-buttons">
        <button onClick={onClearAll}>Clear All</button>
        <button onClick={onClearCompleted}>Clear Completed</button>
        <button onClick={onResetCompleted}>Reset All to Incomplete</button>
      </div>
    </div>
  );
}

export default TaskControls;
