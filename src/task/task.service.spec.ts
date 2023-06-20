import { TaskService } from './task.service';
import { prismaMock } from '../utils/tests/prismaMock';
import {
  createTaskInput,
  createTaskOutput,
} from '../utils/tests/stubs/task.stub';

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
});
