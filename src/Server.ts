import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import LOGGER from 'morgan';

import SessionController from './controller/SessionController';
import UserController from './controller/UserController';

class Server {
  public readonly express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
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
