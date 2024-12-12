import { TasksService } from './tasks.service';
import { Task } from './tasks.module';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Task[];
    createTask(body: {
        title: string;
        description: string;
    }): Task | null;
    updateTaskStatus(updateFields: Partial<Task>, id: string): Task | null;
    deleteTask(id: string): boolean;
}
