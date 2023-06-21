export class TasksNotFoundError extends Error {
  constructor() {
    super('Tasks were not found.');
    this.name = 'TasksNotFoundError';
  }
}
