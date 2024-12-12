import { useEffect, useState } from 'react';
import { apiFetchTasks, apiAddTask, apiUpdateTask, apiDeleteTask } from '../api';
import { Task } from '../types/task';
import { useToast } from '../hooks/useToast';

export const useTasks = () => {
  // State for tasks and loading status
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Toast for user feedback
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  
  // Fetch tasks on initial load or when needed
  const loadTasks = async () => {
    setIsLoading(true);
    try {
        const response = await apiFetchTasks();
        if (response && response.data) {
            setTasks(response.data as Task[]);
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to load tasks. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
};

  // Add a new task
  const addTask = async (task: Task) => {
    setIsLoading(true);
    try {
        const response = await apiAddTask(task);
        if (response && response.data) {
            await setTasks((prevTasks) => [...prevTasks, response.data as Task]);
        } else {
            toast({
                variant: 'destructive',
                title: 'Failed',
                description: response.error || 'An error occurred while adding the task.',
            });
        }
    } catch (error) {
        console.error('Error adding task:', error);
        toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'An error occurred while adding the task.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (task: Task) => {
    setIsLoading(true);
    try {
        const response = await apiUpdateTask(task);
        if (response && response.data) {
        setTasks((prevTasks) => {
            const updatedTaskIndex = prevTasks.findIndex((t) => t.id === task.id);
            const currentTasks = [...prevTasks];
            currentTasks.splice(updatedTaskIndex, 1, response.data as Task);
            return currentTasks;
        });
        toast({
            variant: 'success',
            title: 'Success',
            description: `Task '${task.title}' updated successfully.`,
        });
      } else {
        toast({
            variant: 'destructive',
            title: 'Failed',
            description: response.error || 'An error occurred while updating the task.',
        });
      }
    } catch (error) {
        console.error('Error updating task:', error);
        toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'An error occurred while updating the task.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id: Task['id']) => {
    setIsLoading(true);
    try {
      const response = await apiDeleteTask(id);
      const taskToDelete = tasks.find((task) => task.id === id);

      if (response && response.data) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        toast({
            variant: 'success',
            title: 'Successfully Deleted',
            description: `Task '${taskToDelete?.title}' deleted successfully.`,
        });
      } else {
        toast({
            variant: 'destructive',
            title: 'Failed',
            description: response.error || 'An error occurred while deleting the task.',
        });
      }
    } catch (error) {
        console.error('Error deleting task:', error);
        toast({
            variant: 'destructive',
            title: 'Failed',
            description: 'An error occurred while deleting the task.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  // Return the necessary state and functions
  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
  };
};
