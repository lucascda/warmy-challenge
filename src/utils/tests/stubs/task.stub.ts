import { faker } from '@faker-js/faker';
import {
  type CreateTaskInputDto,
  type CreateTaskOutputDto,
} from '../../../task/dto/createTask.dto';
import { type Task } from '../../../task/task.entity';

export const createTaskInput: CreateTaskInputDto = {
  title: faker.word.words(),
  description: faker.lorem.sentence(),
  finished: false,
};

export const createTaskOutput: CreateTaskOutputDto = {
  id: 1,
  ...createTaskInput,
};

export const getAllOutput: Task[] = [
  {
    id: 1,

    ...createTaskInput,
  },
  {
    id: 2,

    ...createTaskInput,
  },
];

export const getByIdOutput: Task = {
  id: 1,

  ...createTaskInput,
};

export const getByIdInput: Task = {
  id: 3,

  ...createTaskInput,
};
