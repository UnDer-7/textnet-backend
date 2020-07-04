import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import LOGGER from 'morgan';

import UserController from './controller/UserController';
import AuthController from './controller/AuthController';
import { createConnection } from 'typeorm';
import { ConsoleColors } from './util/console.colors';
import { AssertException } from './util/Exceptions';
import ErrorResponse from './model/ErrorResponse';
import HttpStatus from './model/HttpStatus';

class Server {
  public readonly express: express.Application;

  constructor() {
    this.express = express();

    this.startDatabase()
      .then(_ => {
        this.middleware();
        this.routes();
        this.errorHandler();
      })
      .catch(e => {
        console.log(ConsoleColors.FgRed, '\nUnable to Start-Up Project\n');
        console.trace(e);
        throw e;
      })
  }

  public get origins(): string[] {
    const isDev = process.env.NODE_ENV === 'development';
    const prodURL = ['https://texnet-front.web.app', 'https://texnet-front.firebaseapp.com'];

    if (isDev) {
      return [
        'http://localhost:4200',
        'http://localhost:3000',
        ...prodURL,
      ];
    }

    return prodURL;
  }

  private async startDatabase(): Promise<void> {
    try {
      await createConnection();
      console.log(ConsoleColors.FgGreen, '\nSuccessfully connected to the Database\n')
    } catch (e) {
      console.log(ConsoleColors.FgRed, '\nUnable to connect to the Database\n');
      console.trace(e);
      throw e;
    }
  }

  /**
   * call after {@link middleware}
   */
  private errorHandler(): void {
    this.express.use((err: any, _: any, res: Response, __: any): Response => {
      if (err instanceof AssertException) {
        return ErrorResponse
          .from(err, res)
          .build();
      }

      console.trace(err);
      return ErrorResponse
        .from({message: 'Internal Server Error', status: HttpStatus.INTERNAL_SERVER_ERROR}, res)
        .build();
    });
  }

  private middleware(): void {
    this.express.disable('etag');
    this.express.use(helmet());
    this.express.use(cors({
      origin: this.origins,
    }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(LOGGER('dev'));
  }

  private routes(): void {
    this.express.use([
      UserController,
      AuthController,
    ])
  }
}

export default new Server();
