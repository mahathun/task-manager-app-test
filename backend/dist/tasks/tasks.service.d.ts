import { Task } from './tasks.module';
export declare class TasksService {
    private tasks;
    private validateTaskTitle;
    private validateTaskStatus;
    getAllTasks(): Task[];
    createTask(title: string, description: string): Task;
    updateTaskStatus(id: string, updatedFields: Partial<Task>): Task | null;
    deleteTask(id: string): boolean;
}
