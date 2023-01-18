// psql -h localhost -U full_stack_user -d full_stack_dev
//import dotenv from 'dotenv'
import { Pool } from 'pg';
import con from './hassanconfig';

//dotenv.config()

// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD } = process.env

const client = new Pool({
  host: con.POSTGRES_HOST,
  database:con.POSTGRES_DB,
  user:con.POSTGRES_USER,
  password: con.POSTGRES_PASSWORD,
});

export default client;