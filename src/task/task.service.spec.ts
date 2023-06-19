import { TaskService } from './task.service';
import { prismaMock } from '../utils/prismaMock';
import { type CreateTaskInputDto } from './dto/createTask.dto';
import { faker } from '@faker-js/faker';

describe('TaskService Unit Tests', () => {
  const service = new TaskService(prismaMock);

  describe('When creating a new task', () => {
    it('should call PrismaClient.create with correct data', async () => {
      const createTaskInput: CreateTaskInputDto = {
        title: faker.word.words(),
        description: faker.lorem.sentence(),
      };
      prismaMock.task.create.mockResolvedValue({
        id: 1,
        title: createTaskInput.title,
        description: createTaskInput.description,
        finished: false,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
      const prismaSpy = jest.spyOn(prismaMock.task, 'create');

      await service.create(createTaskInput);

      expect(prismaSpy).toHaveBeenCalledWith({ data: createTaskInput });
    });
  });
});
