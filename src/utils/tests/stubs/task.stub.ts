import { faker } from '@faker-js/faker';
import {
  type CreateTaskInputDto,
  type CreateTaskOutputDto,
} from '../../../task/dto/createTask.dto';
import { type Task } from '../../../task/task.entity';

export const createTaskInput: CreateTaskInputDto = {
  title: faker.word.words(),
  description: faker.lorem.sentence(),
};

export const createTaskOutput: CreateTaskOutputDto = {
  id: 1,
  finished: false,
  ...createTaskInput,
};

export const getAllOutput: Task[] = [
  {
    id: 1,
    finished: false,
    ...createTaskInput,
  },
  {
    id: 2,
    finished: true,
    ...createTaskInput,
  },
];

export const getByIdOutput: Task = {
  id: 1,
  finished: false,
  ...createTaskInput,
};
