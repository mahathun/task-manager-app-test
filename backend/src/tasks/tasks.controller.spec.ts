import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.module';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getAllTasks: jest.fn(),
            createTask: jest.fn(),
            updateTaskStatus: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [];
      jest.spyOn(tasksService, 'getAllTasks').mockImplementation(() => result);

      expect(await tasksController.getAllTasks()).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should create and return a task', async () => {
      const task: Task = { id: '1', title: 'Test Task', description: 'Test Description', status: 'pending' as TaskStatus };
      const createTaskDto = { title: 'Test Task', description: 'Test Description' };
      jest.spyOn(tasksService, 'createTask').mockImplementation(() => task);

      expect(await tasksController.createTask(createTaskDto)).toBe(task);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update and return the task', async () => {
      const task: Task = { id: '1', title: 'Test Task', description: 'Test Description', status: 'completed' as TaskStatus };
      const updateFields: Partial<Task> = { status: 'completed' as TaskStatus };
      jest.spyOn(tasksService, 'updateTaskStatus').mockImplementation(() => task);

      expect(await tasksController.updateTaskStatus(updateFields, '1')).toBe(task);
    });
  });

  describe('deleteTask', () => {
    it('should delete the task and return true', async () => {
      jest.spyOn(tasksService, 'deleteTask').mockImplementation(() => true);

      expect(await tasksController.deleteTask('1')).toBe(true);
    });
  });
});