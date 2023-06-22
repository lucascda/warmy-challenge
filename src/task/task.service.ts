import { type PrismaClient } from '@prisma/client';
import {
  type CreateTaskOutputDto,
  type CreateTaskInputDto,
} from './dto/createTask.dto';
import { type Task } from './task.entity';
import { TasksNotFoundError } from './tasks.errors';

export class TaskService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    createTaskInput: CreateTaskInputDto,
  ): Promise<CreateTaskOutputDto> {
    return await this.prisma.task.create({ data: createTaskInput });
  }

  async getAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({});

    if (tasks.length === 0) throw new TasksNotFoundError();

    return tasks;
  }

  async getById(id: number): Promise<any> {
    await this.prisma.task.findUniqueOrThrow({ where: { id } });
  }
}
