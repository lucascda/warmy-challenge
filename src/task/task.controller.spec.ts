import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {
  createTaskInput,
  createTaskOutput,
  getAllOutput,
} from '../utils/tests/stubs/task.stub';
import { prismaMock } from '../utils/tests/prismaMock';
import * as sinon from 'sinon';
import { TasksNotFoundError } from './tasks.errors';

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

  const mockRequest = {
    body: createTaskInput,
  } as any;

  const mockResponse = (): any => {
    const res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };

  describe('When creating a new task', () => {
    it('should call TaskService.create with correct data', async () => {
      sandbox.stub(service, 'create').resolves(createTaskOutput);
      const serviceSpy = jest.spyOn(service, 'create');
      const res = mockResponse();

      await controller.create(mockRequest, res);

      expect(serviceSpy).toHaveBeenCalledWith(mockRequest.body);
    });

    it('should return correct data on success', async () => {
      sandbox.stub(service, 'create').resolves(createTaskOutput);
      const res = mockResponse();

      await controller.create(mockRequest, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, createTaskOutput);
    });
  });

  describe('When listing all tasks', () => {
    it('it should call TaskService.getAll', async () => {
      sandbox.stub(service, 'getAll').resolves([]);
      const serviceSpy = jest.spyOn(service, 'getAll');
      const res = mockResponse();

      await controller.getAll(mockRequest, res);

      expect(serviceSpy).toHaveBeenCalled();
    });

    it('it should return error response if TaskService.getAll throws', async () => {
      sandbox.stub(service, 'getAll').rejects(new TasksNotFoundError());
      const res = mockResponse();

      await controller.getAll(mockRequest, res);

      sinon.assert.calledWith(res.status, 204);
      sinon.assert.calledWith(res.json, {
        statusCode: 204,
        message: 'Tasks were not found.',
      });
    });

    it('should return correct response if TaskService.getAll returns', async () => {
      sandbox.stub(service, 'getAll').resolves(getAllOutput);
      const res = mockResponse();

      await controller.getAll(mockRequest, res);

      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, {
        statusCode: 200,
        data: getAllOutput,
      });
    });
  });
});
