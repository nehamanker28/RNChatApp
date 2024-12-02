import {BaseException} from './BaseException';

export class NetworkException extends BaseException {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }

  get name() {
    return this.constructor.name;
  }
}
