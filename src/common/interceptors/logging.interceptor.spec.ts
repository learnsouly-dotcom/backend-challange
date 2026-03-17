import { LoggingInterceptor } from './logging.interceptor';
import { ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { of } from 'rxjs';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let logSpy: jest.SpyInstance;

  const mockExecutionContext = {
    switchToHttp: () => ({
      getRequest: () => ({ method: 'POST', url: '/passwords/validate' }),
      getResponse: () => ({ statusCode: 200 }),
    }),
  } as ExecutionContext;

  const mockCallHandler: CallHandler = {
    handle: () => of({ isValid: true, failedRules: [] }),
  };

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
    logSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should log request and response with request id and elapsed time', (done) => {
    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
      complete: () => {
        expect(logSpy).toHaveBeenCalledTimes(2);

        const calls = logSpy.mock.calls as string[][];

        // Request log
        expect(calls[0][0]).toMatch(
          /\[req:.+\] --> POST \/passwords\/validate/,
        );

        // Response log with elapsed time
        expect(calls[1][0]).toMatch(
          /\[req:.+\] <-- 200 POST \/passwords\/validate \d+ms/,
        );

        done();
      },
    });
  });
});
