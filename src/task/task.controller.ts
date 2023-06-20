import { type Request, type Response } from 'express';
import { type TaskService } from './task.service';
import { type CreateTaskOutputDto } from './dto/createTask.dto';

export class TaskController {
  constructor(private readonly service: TaskService) {}
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<CreateTaskOutputDto>> {
    const createdTask = await this.service.create(req.body);

    return res.status(200).json(createdTask);
  }
}
