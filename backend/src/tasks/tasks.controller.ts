import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.module';

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
        const task = this.taskService.createTask(title, description);

        if (!task) {
            throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
        }

        return task;

    }   

    @Put(':id')
    updateTaskStatus(@Body() updateFields: Partial<Task>, @Param('id') id: string): Task | null {
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
