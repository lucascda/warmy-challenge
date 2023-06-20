import { faker } from '@faker-js/faker';
import {
  type CreateTaskInputDto,
  type CreateTaskOutputDto,
} from '../../../task/dto/createTask.dto';

export const createTaskInput: CreateTaskInputDto = {
  title: faker.word.words(),
  description: faker.lorem.sentence(),
};

export const createTaskOutput: CreateTaskOutputDto = {
  id: 1,
  finished: false,
  ...createTaskInput,
};
