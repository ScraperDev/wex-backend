import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { Application, json } from 'express';

import { Controller } from './interfaces';
import { errorHandling } from './middleware';

export class App {
  private app: Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeGlobalMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`Listening on ${process.env.PORT}`);
    });
  }

  private initializeGlobalMiddleware(): void {
    this.app.use(cors());
    this.app.use(json());
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandling);
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}
