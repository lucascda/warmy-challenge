import {
  Router,
  type Request,
  type Response,
  type RequestHandler,
} from 'express';
import { taskController } from './task/task.factory';
import { ValidationMiddleware } from './utils/middlewares/validationMiddleware';
import { CreateTaskInputDto } from './task/dto/createTask.dto';

const router = Router();

router.post(
  '/tasks',
  ValidationMiddleware.validate(CreateTaskInputDto) as RequestHandler,
  (async (req: Request, res: Response) => {
    return await taskController.create(req, res);
  }) as RequestHandler,
);

router.get('/tasks', (async (req: Request, res: Response) => {
  return await taskController.getAll(req, res);
}) as RequestHandler);

router.get('/tasks/:taskId', (async (req: Request, res: Response) => {
  return await taskController.getById(req, res);
}) as RequestHandler);

router.put('/tasks/:taskId', (async (req: Request, res: Response) => {
  return await taskController.updateById(req, res);
}) as RequestHandler);

export { router };
