import { Pool } from 'pg';
import con from './hassanconfig';

/**
 * // psql -h localhost -U shopping_user -d shopping
// psql -h localhost -d full_stack_dev -d full_stack_user
//import dotenv from 'dotenv'
 */
let client: any;
console.log('con.ENV value', con.ENV, con.ENV == 'test');
console.log('con.ENV value', con.ENV + '' === 'test');
console.log('con.ENV value', (con.ENV as string).valueOf() === 'test');
if (true) {
  //con.ENV as string === 'test'
  client = new Pool({
    host: con.POSTGRES_HOST,
    database: con.POSTGRES_TEST_DB,
    user: con.POSTGRES_USER,
    password: con.POSTGRES_PASSWORD,
  });
  //console.log("client :"+client)
}
if ((con.ENV as string) === 'dev') {
  client = new Pool({
    host: con.POSTGRES_HOST,
    database: con.POSTGRES_DB,
    user: con.POSTGRES_USER,
    password: con.POSTGRES_PASSWORD,
  });
}
//@ts-ignore
export default client;
