import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.module';
import { v4 as uuid } from 'uuid';
import { isInStringEnum } from '../utils/helpers';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    private validateTaskTitle(title: string): boolean {
        if(!title) {
            return false;
        }
        return true;
    }

    private validateTaskStatus(status: TaskStatus): boolean {
        if(isInStringEnum(status, TaskStatus)) {
            return true;
        }
        return false;
    }
    
    getAllTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        // validate the inputs
        if(!this.validateTaskTitle(title)) {
            return null;
        }

        // create a new task
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.PENDING,
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, title: string, description: string, status: TaskStatus): Task {

        // validate the inputs
        if(!this.validateTaskTitle(title) || !this.validateTaskStatus(status)) {
            return null;
        }

        const taskIndex = this.tasks.findIndex(task => task.id === id);

        // if task not found
        if(taskIndex < 0) {
            return null;
        }

        // if the task is found, update the task
        this.tasks[taskIndex] = {...this.tasks[taskIndex], title, description, status};
        return this.tasks[taskIndex];

    }

    deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        // if task not found
        if( taskIndex < 0){
            return false;
        }

        // if the task is found, delete the task
        this.tasks.splice(taskIndex, 1);
        return true;
    }
}
