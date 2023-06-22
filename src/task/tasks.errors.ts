export class TasksNotFoundError extends Error {
  constructor() {
    super('Tasks were not found.');
    this.name = 'TasksNotFoundError';
  }
}

export class TaskNotFoundError extends Error {
  constructor() {
    super('Task was not found');
    this.name = 'TaskNotFoundError';
  }
}
