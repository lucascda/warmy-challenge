import { TaskService } from './task.service';
import { prismaMock } from '../utils/tests/prismaMock';
import {
  createTaskInput,
  createTaskOutput,
  getAllOutput,
  getByIdOutput,
} from '../utils/tests/stubs/task.stub';
import { type Task } from './task.entity';
import { TaskNotFoundError, TasksNotFoundError } from './tasks.errors';

describe('TaskService Unit Tests', () => {
  const service = new TaskService(prismaMock);

  describe('When creating a new task', () => {
    it('should call PrismaClient.create with correct data', async () => {
      prismaMock.task.create.mockResolvedValue(createTaskOutput);
      const prismaSpy = jest.spyOn(prismaMock.task, 'create');

      await service.create(createTaskInput);

      expect(prismaSpy).toHaveBeenCalledWith({ data: createTaskInput });
    });

    it('should return correct response', async () => {
      prismaMock.task.create.mockResolvedValue(createTaskOutput);

      const response = await service.create(createTaskInput);

      expect(response).toEqual(createTaskOutput);
    });
  });

  describe('When listing all tasks', () => {
    it('it should call PrismaClient.findMany', async () => {
      const prismaSpy = jest
        .spyOn(prismaMock.task, 'findMany')
        .mockResolvedValue(getAllOutput);

      await service.getAll();

      expect(prismaSpy).toHaveBeenCalled();
    });

    it('it should throw if no tasks were found', async () => {
      const emptyTasks: Task[] = [];
      prismaMock.task.findMany.mockResolvedValue(emptyTasks);

      const promise = service.getAll();

      await expect(promise).rejects.toThrow(new TasksNotFoundError());
    });

    it('it should return correct response', async () => {
      prismaMock.task.findMany.mockResolvedValue(getAllOutput);

      const response = await service.getAll();

      expect(response).toEqual(getAllOutput);
    });
  });

  describe('When listing a specific task', () => {
    it('should call PrismaClient.findUnique with id', async () => {
      const prismaSpy = jest.spyOn(prismaMock.task, 'findUnique');

      await service.getById('1');

      expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw if task was not found', async () => {
      prismaMock.task.findUnique.mockResolvedValue(null as any);

      const promise = service.getById('1');

      await expect(promise).rejects.toThrow(new TaskNotFoundError());
    });

    it('should return correct response if task was found', async () => {
      prismaMock.task.findUnique.mockResolvedValue(getByIdOutput);

      const response = await service.getById('1');

      expect(response).toEqual(getByIdOutput);
    });
  });

  describe('When updating a specifig task', () => {
    const updatedTask = {
      ...getByIdOutput,
      title: 'updated_title',
      description: 'updated_description',
      finished: true,
    };

    it('should call PrismaClient.findUnique with task id', async () => {
      const prismaSpy = jest.spyOn(prismaMock.task, 'findUnique');

      await service.updateById('1', updatedTask);

      expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw if task was not found', async () => {
      prismaMock.task.findUnique.mockResolvedValue(null as any);

      const promise = service.updateById('1', updatedTask);

      await expect(promise).rejects.toThrow(new TaskNotFoundError());
    });

    it('it should update task with correct data', async () => {
      const prismaSpy = prismaMock.task.update.mockResolvedValue(updatedTask);

      const response = await service.updateById('1', updatedTask);

      expect(prismaSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedTask,
      });
      expect(response).toEqual(updatedTask);
    });
  });

  describe('When deleting a specific task', () => {
    it('should call PrismaClient.delete with task id', async () => {
      const prismaSpy = jest.spyOn(prismaMock.task, 'delete');

      await service.deleteById('1');

      expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw if task was not found', async () => {
      prismaMock.task.findUnique.mockResolvedValue(null as any);

      const promise = service.deleteById('1');

      await expect(promise).rejects.toThrow(new TaskNotFoundError());
    });

    it('should return correct response if task was deleted', async () => {
      prismaMock.task.delete.mockResolvedValue(getByIdOutput);

      const response = await service.deleteById('1');

      expect(response).toEqual(getByIdOutput);
    });
  });
});
