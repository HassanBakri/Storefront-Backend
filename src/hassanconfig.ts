import dotenv from 'dotenv';
dotenv.config();
const config = {
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_TEST_DB: process.env.POSTGRES_TEST_DB,
  BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWTSECRIT: process.env.JWTSECRIT,
  ENV: process.env.ENV,
  port: process.env.PORT,
};
export default config;
