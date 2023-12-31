import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import { type ApiError } from './utils/errors/apiError';
import { serve, setup } from 'swagger-ui-express';
import swagger from '../swagger.json';
dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    success: false,
    message: err.message,
    rawErrors: err.rawErrors,
  });
});

// swagger

app.use('/api-docs', serve, setup(swagger));

export { app };
