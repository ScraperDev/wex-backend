import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { createConnection } from 'typeorm';

import { App } from './App';
import { ormConfig, validateEnv } from './config';

import { AuthController } from './auth';

(async (): Promise<void> => {
  loadEnv();
  validateEnv();

  await createConnection(ormConfig);
  console.log('Database Connected');
  const app = new App([new AuthController()]);
  app.listen();
})();
