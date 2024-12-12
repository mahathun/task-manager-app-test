import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.module';
import { isInStringEnum } from '../utils/helpers';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() body: {title: string, description: string}): Task | null {
        const { title, description } = body;

        if (!title) {
            throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
        }

        const task = this.tasksService.createTask(title, description);
        return task;
    }   

    @Put(':id')
    updateTaskStatus(@Body() updateFields: Partial<Task>, @Param('id') id: string): Task | null {
        const {title, status} = updateFields;

        if (title === "") {
            throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
        }

        if (status && !isInStringEnum(status, TaskStatus)) {
            throw new HttpException('Only Pending and Completed status allowed', HttpStatus.BAD_REQUEST);
        }

        return this.tasksService.updateTaskStatus(id, updateFields);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): boolean {
        const hasTaskDeleted = this.tasksService.deleteTask(id);

        if (!hasTaskDeleted) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return hasTaskDeleted;
    }

}
