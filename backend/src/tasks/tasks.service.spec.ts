import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.module';

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

  describe('getAllTasks', () => {
    it('should return an empty array initially', () => {
      expect(service.getAllTasks()).toEqual([]);
    });
  });

  describe('createTask', () => {
    it('should create a task with valid inputs', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      expect(task).toBeDefined();
      expect(task.title).toBe(title);
      expect(task.description).toBe(description);
      expect(task.status).toBe(TaskStatus.PENDING);
    });

    it('should return null if title is invalid', () => {
      const task = service.createTask('', 'Test Description');
      expect(task).toBeNull();
    });
  });

  describe('updateTaskStatus', () => {
    it('should update the task status with valid inputs', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      const updatedTask = service.updateTaskStatus(task.id, { status: TaskStatus.COMPLETED });
      expect(updatedTask).toBeDefined();
      expect(updatedTask.status).toBe(TaskStatus.COMPLETED);
    });

    it('should return null if task id is not found', () => {
      const updatedTask = service.updateTaskStatus('invalid-id', { status: TaskStatus.COMPLETED });
      expect(updatedTask).toBeNull();
    });

    it('should return null if status is invalid', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      const updatedTask = service.updateTaskStatus(task.id, { status: 'INVALID_STATUS' as TaskStatus });
      expect(updatedTask).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('should delete the task with valid id', () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = service.createTask(title, description);
      const result = service.deleteTask(task.id);
      expect(result).toBe(true);
      expect(service.getAllTasks()).toEqual([]);
    });

    it('should return false if task id is not found', () => {
      const result = service.deleteTask('invalid-id');
      expect(result).toBe(false);
    });
  });
});