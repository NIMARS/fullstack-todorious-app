import React, { useState } from "react";

const Task = ({ task, onToggle, onDelete, onEdit, onEditPriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(task.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handlePriorityChange = (e) => {
    onEditPriority(task.id, e.target.value);
  };

  return (
    <div
      className={`task ${task.completed ? "completed" : ""} priority-${task.priority}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}

      {/* Селектор для изменения приоритета */}
      <select value={task.priority} onChange={handlePriorityChange}>
        <option value="common">Common</option>
        <option value="rare">Rare</option>
        <option value="ultra">Ultraimportant</option>
      </select>
    </div>
  );
};

export default Task;