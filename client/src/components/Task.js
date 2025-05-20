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


//old function
// function Task({ task, onToggle, onDelete, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(task.text);

//   const handleSave = () => {
//     onEdit(task.id, editText);
//     setIsEditing(false);
//   };

//   return (
//     <div className={`task-item ${task.priority}`}>

      

//       <input
//         type="checkbox"
//         checked={task.completed}
//         onChange={() => onToggle(task.id)}
//       />

//       {isEditing ? (
//         <>
//           <input
//             type="text"
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//           />
//           <span className="priority-label">{task.priority}</span>

//           <button onClick={handleSave}>💾 Save</button>
//         </>
//       ) : (
//         <>
//           <span
//             style={{ textDecoration: task.completed ? "line-through" : "none" }}
//           >
//             {task.text}
//           </span>
//           <span className="priority-label">{task.priority}</span>

//           <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
//         </>
//       )}
      
//       <select
//         value={task.priority}
//         onChange={(e) => onEditPriority(task.id, e.target.value)}
//       >
//         <option value="common">Common</option>
//         <option value="rare">Rare</option>
//         <option value="ultra">Ultraimportant</option>
//       </select>

//       <button onClick={() => onDelete(task.id)}>🗑</button>
//     </div>
//   );
// }