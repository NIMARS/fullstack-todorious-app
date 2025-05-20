import { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('common');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue, priority);
      setInputValue('');
      setPriority('common');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="New task"
      />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="common">Common</option>
        <option value="rare">Rare</option>
        <option value="ultra">UltraImportant</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTaskForm;