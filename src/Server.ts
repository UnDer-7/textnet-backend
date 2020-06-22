import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import LOGGER from 'morgan';

import DATABASE_CONFIG from './config/DatabaseConfig';
import SessionController from './controller/SessionController';
import UserController from './controller/UserController';
import { createConnection } from 'typeorm';
import { ConsoleColors } from './util/console.colors';

class Server {
  public readonly express: express.Application;

  constructor() {
    this.express = express();

    this.startDatabase()
      .then(_ => {
        this.middleware();
        this.routes();
      })
      .catch(e => {
        console.log(ConsoleColors.FgRed, '\nUnable to Start-Up Project\n');
        console.trace(e);
      })
  }

  public get origins(): string[] {
    const isDev = process.env.NODE_ENV === 'development';
    const prodURL = ['https://cadeonibus.web.app', 'https://cadeonibus.com.br'];

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
      await createConnection(DATABASE_CONFIG);
      console.log(ConsoleColors.FgGreen, '\nSuccessfully connected to the Database\n')
    } catch (e) {
      console.log(ConsoleColors.FgRed, '\nUnable to connect to the Database\n');
      console.trace(e);
    }
  }

  private middleware(): void {
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
      SessionController,
      UserController,
    ])
  }
}

export default new Server();
