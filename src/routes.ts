import {
  Router,
  type Request,
  type Response,
  type RequestHandler,
} from 'express';
import { createTaskController } from './task/task.factory';

const router = Router();

router.post('/tasks', (async (req: Request, res: Response) => {
  return await createTaskController.create(req, res);
}) as RequestHandler);

export { router };
