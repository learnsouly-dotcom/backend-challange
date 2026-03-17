import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  requestContext,
  generateRequestId,
} from '../context/request-context.js';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = generateRequestId();
    res.setHeader('X-Request-Id', requestId);

    requestContext.run({ requestId }, () => {
      next();
    });
  }
}
