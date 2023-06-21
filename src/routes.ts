import {
  Router,
  type Request,
  type Response,
  type RequestHandler,
} from 'express';
import { createTaskController } from './task/task.factory';
import { ValidationMiddleware } from './utils/middlewares/validationMiddleware';
import { CreateTaskInputDto } from './task/dto/createTask.dto';

const router = Router();

router.post(
  '/tasks',
  ValidationMiddleware.validate(CreateTaskInputDto) as RequestHandler,
  (async (req: Request, res: Response) => {
    return await createTaskController.create(req, res);
  }) as RequestHandler,
);

export { router };
