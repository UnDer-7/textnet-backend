import { Response } from 'express';

import { ExceptionOptions } from '../util/Exceptions';
import HttpStatus from './HttpStatus';

export default class ErrorResponse {
  private readonly message: string;
  private readonly status: HttpStatus;
  private readonly response: Response;

  public constructor({message, status}: ExceptionOptions, responseRequest: Response) {
    this.message = message;
    this.status = status
    this.response = responseRequest;
  }

  public static from(options: ExceptionOptions, responseRequest: Response): ErrorResponse {
    return new ErrorResponse(options, responseRequest);
  }

  public build(): Response {
    return this.response.status(this.status).json({
      message: this.message,
      status: this.status,
    });
  }
}
