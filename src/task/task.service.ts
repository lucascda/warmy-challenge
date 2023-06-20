import { type PrismaClient } from '@prisma/client';
import { type CreateTaskInputDto } from './dto/createTask.dto';

export class TaskService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    createTaskInput: CreateTaskInputDto,
  ): Promise<CreateTaskInputDto> {
    return await this.prisma.task.create({ data: createTaskInput });
  }
}
