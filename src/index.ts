import 'reflect-metadata';
import { config as loadEnv } from 'dotenv';
import { createConnection } from 'typeorm';

import { App } from './App';
import { ormConfig, validateEnv } from './config';
import { UserController } from './user';
import { ListingController } from './listing/Listing.controller';

(async (): Promise<void> => {
  loadEnv();
  validateEnv();

  // if this throws, the app's dead in the water anyway.
  await createConnection(ormConfig());
  console.log('Database Connected');
  const app = new App([new UserController(), new ListingController()]);
  app.listen();
})();
