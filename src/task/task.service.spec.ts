import { TaskService } from './task.service';
import { prismaMock } from '../utils/prismaMock';
import { type CreateTaskInputDto } from './dto/createTask.dto';
import { faker } from '@faker-js/faker';

describe('TaskService Unit Tests', () => {
  const service = new TaskService(prismaMock);

  const mockedOutputData = {
    id: 1,
    finished: false,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };

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

    it('should return correct response', async () => {
      const createTaskInput: CreateTaskInputDto = {
        title: faker.word.words(),
        description: faker.lorem.sentence(),
      };

      prismaMock.task.create.mockResolvedValue({
        ...createTaskInput,
        ...mockedOutputData,
      });

      const response = await service.create(createTaskInput);

      expect(response).toEqual({ ...createTaskInput, ...mockedOutputData });
    });
  });
});
