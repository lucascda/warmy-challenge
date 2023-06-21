import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import prisma from '../prismaClient';

const taskService = new TaskService(prisma);
const taskController = new TaskController(taskService);

export { taskController };
