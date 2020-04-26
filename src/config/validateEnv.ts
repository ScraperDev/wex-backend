import { cleanEnv, port, str } from 'envalid';

export function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    JWT_SECRET: str(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    PORT: port(),
  });
}
