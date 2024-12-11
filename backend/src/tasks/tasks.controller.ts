import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.module';
import { isInStringEnum } from 'src/utils/helpers';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Post()
    createTask(@Body() body: {title: string, description: string}): Task {
        const { title, description } = body;

        if (!title) {
            throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
        }

        const task = this.taskService.createTask(title, description);
        return task;
    }   

    @Put(':id')
    updateTaskStatus(@Body() updateFields: Partial<Task>, @Param('id') id: string): Task | null {
        const {title, status} = updateFields;

        if (!title) {
            throw new HttpException('Title is required', HttpStatus.BAD_REQUEST);
        }

        if (status && !isInStringEnum(status, TaskStatus)) {
            throw new HttpException('Only Pending and Completed status allowed', HttpStatus.BAD_REQUEST);
        }

        return this.taskService.updateTaskStatus(id, updateFields);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): boolean {
        const hasTaskDeleted = this.taskService.deleteTask(id);

        if (!hasTaskDeleted) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        return hasTaskDeleted;
    }

}
