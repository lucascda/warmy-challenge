import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {
  createTaskInput,
  createTaskOutput,
} from '../utils/tests/stubs/task.stub';
import { prismaMock } from '../utils/tests/prismaMock';
import * as sinon from 'sinon';
describe('TaskController Unit Tests', () => {
  const service = new TaskService(prismaMock);
  const controller = new TaskController(service);

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
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

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
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('it should call TaskService.getAll', async () => {
      sandbox.stub(service, 'getAll').resolves([]);
      const serviceSpy = jest.spyOn(service, 'getAll');
      const res = mockResponse();

      await controller.getAll(mockRequest, res);

      expect(serviceSpy).toHaveBeenCalled();
    });
  });
});
