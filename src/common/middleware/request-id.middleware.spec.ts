import { RequestIdMiddleware } from './request-id.middleware';
import { requestContext } from '../context/request-context';
import { Request, Response } from 'express';

describe('RequestIdMiddleware', () => {
  let middleware: RequestIdMiddleware;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    middleware = new RequestIdMiddleware();
    mockReq = {};
    mockRes = {
      setHeader: jest.fn(),
    };
  });

  it('should set X-Request-Id header on the response', (done) => {
    middleware.use(mockReq as Request, mockRes as Response, () => {
      expect(mockRes.setHeader).toHaveBeenCalledWith(
        'X-Request-Id',
        expect.any(String),
      );
      done();
    });
  });

  it('should call next() within AsyncLocalStorage context', (done) => {
    middleware.use(mockReq as Request, mockRes as Response, () => {
      const store = requestContext.getStore();
      expect(store).toBeDefined();
      expect(store!.requestId).toEqual(expect.any(String));
      done();
    });
  });
});
