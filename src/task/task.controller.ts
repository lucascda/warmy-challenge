import { type Request, type Response } from 'express';
import { type TaskService } from './task.service';
import { type CreateTaskOutputDto } from './dto/createTask.dto';
import { type Task } from './task.entity';
import { TaskNotFoundError, TasksNotFoundError } from './tasks.errors';

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
        data: allTasks,
      });
    } catch (e) {
      if (e instanceof TasksNotFoundError)
        return res.status(204).json({
          statusCode: 204,
          message: e.message,
        });
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    let task: Task;
    try {
      task = await this.service.getById(req.params.taskId);
      return res.status(200).json({
        statusCode: 200,
        data: task,
      });
    } catch (e) {
      if (e instanceof TaskNotFoundError)
        return res.status(204).json({
          statusCode: 204,
          message: e.message,
        });
    }
  }

  async updateById(req: Request, res: Response): Promise<any> {
    try {
      await this.service.getById(req.params.taskId);
    } catch (e) {}

    await this.service.updateById(req.params.taskId, req.body);
  }
}
