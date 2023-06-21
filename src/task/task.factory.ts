import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import prisma from '../prismaClient';

const createTaskService = new TaskService(prisma);
const createTaskController = new TaskController(createTaskService);

export { createTaskController };
