const API_URL = "http://localhost:4000";

export async function fetchTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json();
}

export async function addTask(task) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(id, updates) {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
}