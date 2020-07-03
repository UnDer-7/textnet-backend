import HttpStatus from '../model/HttpStatus';

export interface ExceptionOptions {
  message: string;
  status: HttpStatus;
}

export class Exception extends Error implements ExceptionOptions {
  public constructor(
    public readonly message: string,
    public readonly status: HttpStatus,
    public readonly error?: any,
  ) {
    super(message);

    // eslint-disable-next-line no-console
    if (error) {
      console.warn('Thrown error: ', error)
    }
  }
}

export class JWTInvalidException extends Exception {
  constructor(
    public readonly message: string,
    public readonly error: any,
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
}

export class AssertException extends Exception {
  constructor(
    public readonly message: string
  ) {
    super(message, HttpStatus.BAD_REQUEST, null);
  }
}
