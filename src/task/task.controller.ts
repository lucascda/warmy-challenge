import { type Request, type Response } from 'express';
import { type TaskService } from './task.service';

export class TaskController {
  constructor(private readonly service: TaskService) {}
  async create(request: Request, response: Response): Promise<any> {
    return await this.service.create(request.body);
  }
}
