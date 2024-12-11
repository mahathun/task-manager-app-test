import { handleApiCall } from '@/lib/utils';
import api from './api';

// Get all tasks
export const apiFetchTasks = async () => {
  return await handleApiCall(()=>api.get('/tasks'));
};

// Add a new task
export const apiAddTask = async (task) => {
  return await handleApiCall(()=>api.post('/tasks', task));
}

// Update a task
export const apiUpdateTask = async (task) => {
  return await handleApiCall(()=>api.put(`/tasks/${task.id}`, task));
}

// Delete a task
export const apiDeleteTask = async (id) => {
  return await handleApiCall(()=>api.delete(`/tasks/${id}`));
}