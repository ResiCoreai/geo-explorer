export const ABORT_ERROR = 'AbortError';

export function isAbortError(error: Error): boolean {
  return error.message === ABORT_ERROR;
}
