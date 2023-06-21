import { type Request, type Response } from 'express';
import { type TaskService } from './task.service';
import { type CreateTaskOutputDto } from './dto/createTask.dto';
import { type Task } from './task.entity';
import { TasksNotFoundError } from './tasks.errors';

export class TaskController {
  constructor(private readonly service: TaskService) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<Response<CreateTaskOutputDto>> {
    const createdTask = await this.service.create(req.body);

    return res.status(200).json(createdTask);
  }

  async getAll(req: Request, res: Response): Promise<any> {
    let allTasks: Task[] = [];
    try {
      allTasks = await this.service.getAll();
      return res.status(200).json({
        statusCode: 200,
        data: { ...allTasks },
      });
    } catch (e) {
      if (e instanceof TasksNotFoundError)
        return res.status(204).json({
          statusCode: 204,
          message: e.message,
        });
    }
  }
}
