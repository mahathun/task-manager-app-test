import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
        return this.taskService.createTask(title, description);
    }   

    @Put(':id')
    updateTaskStatus(@Body() updateFields: Partial<Task>, @Param('id') id: string): Task | null {
        return this.taskService.updateTaskStatus(id, updateFields);
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): boolean {
        return this.taskService.deleteTask(id);
    }

}
