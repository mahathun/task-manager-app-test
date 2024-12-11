import api from './api';

// Get all tasks
export const apiFetchTasks = async () => {
  const response = await api.get('/tasks');
  return response.data; 
};

// Add a new task
export const apiAddTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
}

// Update a task
export const apiUpdateTask = async (task) => {
  const response = await api.put(`/tasks/${task.id}`, task);
  return response.data;
}

// Delete a task
export const apiDeleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
}