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

  const res = {
    status: 200,
  } as any;

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

      await controller.create(mockRequest, res);

      expect(serviceSpy).toHaveBeenCalledWith(mockRequest.body);
    });
  });
});
