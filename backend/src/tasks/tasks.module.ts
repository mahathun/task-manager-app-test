import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})

enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export class TasksModule {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
