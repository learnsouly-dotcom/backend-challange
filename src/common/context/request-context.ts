import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

interface RequestStore {
  requestId: string;
}

export const requestContext = new AsyncLocalStorage<RequestStore>();

export function getRequestId(): string {
  return requestContext.getStore()?.requestId ?? 'no-req';
}

export function generateRequestId(): string {
  return randomUUID().slice(0, 8);
}
