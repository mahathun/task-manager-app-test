import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './tasks.module';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TasksService', () => {
    let service: TasksService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [TasksService],
      }).compile();

      service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a task', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      expect(task).toBeDefined();
      expect(task.title).toBe(title);
      expect(task.description).toBe(description);
      expect(task.status).toBe(TaskStatus.PENDING);
    });

    it('should not create a task with an empty title', () => {
      const task = service.createTask('', 'Test Description');
      expect(task).toBeNull();
    });

    it('should get all tasks', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      service.createTask(title, description);
      const tasks = service.getAllTasks();
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe(title);
      expect(tasks[0].description).toBe(description);
    });

    it('should update a task status', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      const updatedTask = service.updateTaskStatus(task.id, title, description, TaskStatus.COMPLETED);
      expect(updatedTask).toBeDefined();
      expect(updatedTask.status).toBe(TaskStatus.COMPLETED);
    });

    it('should not update a task with invalid status', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      const updatedTask = service.updateTaskStatus(task.id, title, description, 'INVALID_STATUS' as TaskStatus);
      expect(updatedTask).toBeNull();
    });

    it('should delete a task', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      const result = service.deleteTask(task.id);
      expect(result).toBe(true);
      expect(service.getAllTasks().length).toBe(0);
    });

    it('should not delete a non-existing task', () => {
      const result = service.deleteTask('non-existing-id');
      expect(result).toBe(false);
    });
  });
});
