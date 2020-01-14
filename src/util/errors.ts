import {CustomError} from 'ts-custom-error';

export class ValidationError extends CustomError {
  public constructor(public code: number, message: string) {
    super(`${code}: ${message}`);
  }
}
