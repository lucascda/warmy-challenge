import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {
  createTaskInput,
  createTaskOutput,
  getAllOutput,
} from '../utils/tests/stubs/task.stub';
import { prismaMock } from '../utils/tests/prismaMock';
import * as sinon from 'sinon';
import { TaskNotFoundError, TasksNotFoundError } from './tasks.errors';

describe('TaskController Unit Tests', () => {
  const service = new TaskService(prismaMock);
  const controller = new TaskController(service);

  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  const mockRequest = (data?: any, params?: any): any => ({
    body: data,
    params,
  });

  const mockResponse = (): any => {
    const res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };

  describe('When creating a new task', () => {
    const req = mockRequest(createTaskInput);
    const res = mockResponse();

    it('should call TaskService.create with correct data', async () => {
      sandbox.stub(service, 'create').resolves(createTaskOutput);
      const serviceSpy = jest.spyOn(service, 'create');

      await controller.create(req, res);

      expect(serviceSpy).toHaveBeenCalledWith(req.body);
    });

    it('should return correct data on success', async () => {
      sandbox.stub(service, 'create').resolves(createTaskOutput);

      await controller.create(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, createTaskOutput);
    });
  });

  describe('When listing all tasks', () => {
    const req = mockRequest();
    const res = mockResponse();

    it('it should call TaskService.getAll', async () => {
      sandbox.stub(service, 'getAll').resolves([]);
      const serviceSpy = jest.spyOn(service, 'getAll');

      await controller.getAll(req, res);

      expect(serviceSpy).toHaveBeenCalled();
    });

    it('it should return error response if TaskService.getAll throws', async () => {
      sandbox.stub(service, 'getAll').rejects(new TasksNotFoundError());

      await controller.getAll(req, res);

      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledWith(res.json, {
        statusCode: 204,
        message: 'Tasks were not found.',
      });
    });

    it('should return correct response if TaskService.getAll returns', async () => {
      sandbox.stub(service, 'getAll').resolves(getAllOutput);

      await controller.getAll(req, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, {
        statusCode: 200,
        data: getAllOutput,
      });
    });
  });

  describe('When listing a specific task', () => {
    const params = { taskId: '1' };
    const req = mockRequest({}, params);
    const res = mockResponse();

    it('should call TaskService.getById with task id', async () => {
      const serviceSpy = jest.spyOn(service, 'getById');

      await controller.getById(req, res);

      expect(serviceSpy).toHaveBeenCalledWith('1');
    });

    it('should return error response if TaskService.getById throws', async () => {
      sinon.stub(service, 'getById').rejects(new TaskNotFoundError());

      await controller.getById(req, res);

      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledWith(res.json, {
        statusCode: 204,
        message: 'Task was not found',
      });
    });
  });
});
