import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
