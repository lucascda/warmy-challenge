import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { type NextFunction, type Request, type Response } from 'express';
import { validate } from 'class-validator';
import { BadRequestError } from '../errors/apiError';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ValidationMiddleware {
  static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const convertedObject = plainToInstance(classInstance, req.body);
      await validate(convertedObject).then((errors) => {
        if (errors.length > 0) {
          let rawErrors: string[] = [];
          for (const errorItem of errors) {
            rawErrors = rawErrors.concat(
              ...rawErrors,
              Object.values(errorItem.constraints ?? []),
            );
          }
          const validationErrorText = 'Request validation failed!';
          console.log('error found!', rawErrors);
          next(new BadRequestError(validationErrorText, rawErrors));
        }
      });
      next();
    };
  };
}
