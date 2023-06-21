export class ApiError extends Error {
  statusCode: number;
  rawErrors: string[] = [];

  constructor(statusCode: number, message: string, rawErrors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    if (rawErrors != null) {
      this.rawErrors = rawErrors;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string, errors: string[]) {
    super(422, message, errors);
  }
}
