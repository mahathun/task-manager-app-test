import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './tasks/tasks.module';

@Module({
  imports: [Task],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
