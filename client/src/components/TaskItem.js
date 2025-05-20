// TaskItem.js
import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li style={{ 
      textDecoration: task.completed ? 'line-through' : 'none',
      color: task.completed ? '#999' : '#000'
    }}>
      <input 
        type="checkbox" 
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {task.text}
      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
}
